import React, { useEffect, useState } from "react";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { API } from "../axios/API";
import { ChatRoom } from "../components/ChatRoom";
import { useSelector } from "react-redux";
import { SearchInUsers } from "../components/SearchInUsers";
import {
  Link,
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";

export const Chat = () => {
  const location = useLocation();
  const { socket, activeUsers } = useOutletContext();
  const { roomId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState({});
  const [isSearchingMessage, setSearchingMessage] = useState(false);
  const [rooms, setRooms] = useState([]);
  const ourSelf = useSelector((state) => state.userStore.user);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    API.get("/api/rooms").then((res) => {
      setRooms(res.data);
    });
  }, []);

  const searchUsers = (e) => {
    setSearchInput(e.target.value);

    setTimeout(() => {
      API.get(`/api/users/search?searchName=${searchInput}`).then((res) => {
        setRooms(res.data);
      });
    }, 500);
  };

  useEffect(() => {
    return rooms.find((room) => {
      if (room.id == roomId) {
        return setSelectedRoom(room);
      }
    });
  }, [rooms, roomId]);

  return (
    <>
      <div
        className={`sm:min-w-[500px] lg:max-w-[500px] w-screen border-r-2 p-7 ${
          roomId || location.pathname == "/chat/new" ? "hidden lg:block" : ""
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
                className={`flex flex-row hover:cursor-pointer mx-2 p-4 ${
                  room.id == roomId
                    ? "bg-emerald-300 rounded-lg"
                    : "hover:bg-gray-100 rounded-lg"
                }`}
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

      <div
        className={`min-h-screen w-full ${
          roomId || location.pathname == "/chat/new" ? "block" : "hidden"
        }`}
      >
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
