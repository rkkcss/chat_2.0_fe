import React, { useEffect, useRef, useState } from "react";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { API } from "../axios/API";
import { ChatRoom } from "../components/ChatRoom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { SearchInUsers } from "../components/SearchInUsers";
import { NewChat } from "../modals/NewChat";
import { Link, Outlet, useParams } from "react-router-dom";

export const Chat = () => {
  const socket = useRef();

  const { roomId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState({});
  const [isSearchingMessage, setSearchingMessage] = useState(false);
  const [rooms, setRooms] = useState([]);
  const ourSelf = useSelector((state) => state.userStore.user);
  const [searchInput, setSearchInput] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socket.current = io("ws://192.168.0.26:8085");
    API.get("/api/rooms").then((res) => {
      setRooms(res.data);
    });
    const handleGetActiveUsers = (userList) => handleGetActiveUsers(userList);
    const activeUsersListener = (userList) => {
      const newList = Object.keys(userList).map((userId) => ({
        id: userId,
        sessionId: userList[userId],
      }));
      setActiveUsers(newList);
    };

    socket?.current.on("getActiveUsers", activeUsersListener);

    return () => {
      socket.current.off("getActiveUsers", activeUsersListener);
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    rooms.filter((room) => {
      if (room.id == roomId) {
        setSelectedRoom(room);
      }
    });
  }, [rooms]);

  //add userid to server when connected
  useEffect(() => {
    socket.current.emit("getUserId", ourSelf.id);
  }, []);

  const searchUsers = (e) => {
    setSearchInput(e.target.value);

    setTimeout(() => {
      API.get(`/api/users/search?searchName=${searchInput}`).then((res) => {
        console.log("search result", res);
        setRooms(res.data);
      });
    }, 500);
  };

  return (
    <>
      <div
        className={`max-w-[500px] min-w-[500px] border-r-2 p-7 ${
          false ? "hidden lg:block" : ""
        }`}
      >
        <div className="h-full border rounded-lg overflow-y-auto">
          <div className="border-b pb-3 p-4">
            <div className="flex justify-between items-start">
              <h1 className="font-bold text-2xl mb-3 text-gray-700">
                Üzenetek
              </h1>
              <div className="flex gap-2">
                <Link to={"/chat/new"}>
                  <PlusCircleOutlined
                    className="text-2xl
                    text-gray-700 
                hover:cursor-pointer 
                hover:text-green-300"
                  />
                </Link>
                <SearchOutlined
                  className={`text-2xl 
                  text-gray-700 
                  hover:cursor-pointer 
                hover:text-green-300`}
                  onClick={() => setSearchingMessage(!isSearchingMessage)}
                />
              </div>
            </div>
            {isSearchingMessage && (
              <SearchInUsers
                searchInput={searchInput}
                handleInputChange={(e) => searchUsers(e)}
              />
            )}
          </div>
          <div className="">
            {rooms.map((room) => (
              <Link
                to={"/chat/" + room.id}
                className="flex flex-row hover:cursor-pointer hover:bg-gray-100/60 p-4 hover:bg-green-300"
                key={room.id}
                onClick={() => setSelectedRoom(room)}
              >
                <ChatRoom
                  room={room}
                  activeUsers={activeUsers}
                  ourSelf={ourSelf}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={`min-h-screen w-full`}>
        <div className="h-full flex flex-col">
          <Outlet
            context={{
              room: selectedRoom,
              socket: socket,
              activeUsers: activeUsers,
              setSelectedRoom: setSelectedRoom,
            }}
          />
        </div>
      </div>
    </>
  );
};
