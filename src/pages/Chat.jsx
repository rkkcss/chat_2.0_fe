import React, { useEffect, useRef, useState } from "react";
import {
  SettingOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button } from "../components/Button";
import user from "../assets/user.jpg";
import { ChatMessages } from "../components/ChatMessages";
import { API } from "../axios/API";
import { ChatRoom } from "../components/ChatRoom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { SearchInUsers } from "../components/SearchInUsers";
import { NewChat } from "../modals/NewChat";

export const Chat = () => {
  const socket = useRef();

  const [createChatModal, setCreateChatModal] = useState(false);
  const [isSearchingMessage, setSearchingMessage] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomMessages, setRoomMessages] = useState([]);
  const ourSelf = useSelector((state) => state.userStore.user);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    socket.current = io("ws://192.168.0.26:8085");
    API.get("/api/rooms").then((res) => {
      setRooms(res.data);
      console.log("roms", res.data);
    });
    return () => {
      socket.current.on("disconnect");
    };
  }, []);

  const getSelectedRoomMessages = (room) => {
    //add user to a room
    socket.current.emit("joinRoom", { roomId: room.id });

    setSelectedRoom(room);
    API.get(`/api/messages/room/${room.id}`).then((res) => {
      console.log(res.data);
      setRoomMessages(res.data);
    });
  };

  //add userid to server when connected
  useEffect(() => {
    socket.current.emit("getUserId", ourSelf.id);
  }, [ourSelf]);

  //
  useEffect(() => {
    socket?.current?.on("groupMessageToClient", (data) => {
      setRoomMessages([...roomMessages, data]);
    });
  });

  const searchUsers = (e) => {
    setSearchInput(e.target.value);

    setTimeout(() => {
      API.get(`/api/users/search?searchName=${searchInput}`).then((res) => {
        console.log("search result", res);
        setRooms(res.data);
      });
    }, 500);
  };

  const getLastMessage = (room) => {
    // return room?.messages[room?.messages?.length - 1]?.text == undefined
    //   ? "Új beszélgetés indítása."
    //   : room?.messages[room.messages?.length - 1]?.text;
  };

  return (
    <>
      <NewChat
        onOpen={createChatModal}
        onClose={() => setCreateChatModal(false)}
      />
      <div
        className={`max-w-[500px] min-w-[500px] border-r-2 p-7 ${
          selectedRoom ? "hidden lg:block" : ""
        }`}
      >
        <div className="h-full border rounded-lg p-4 overflow-y-auto">
          <div className="border-b pb-3">
            <div className="flex justify-between items-start">
              <h1 className="font-bold text-2xl mb-3">Messages</h1>
              <div className="flex gap-2">
                <PlusCircleOutlined
                  className="text-2xl 
                hover:cursor-pointer 
                hover:text-green-300"
                  onClick={() => setCreateChatModal(true)}
                />

                <SearchOutlined
                  className={`text-2xl 
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
              <div
                className="flex flex-row border-b py-5 hover:cursor-pointer"
                key={room.id}
                onClick={() => getSelectedRoomMessages(room)}
              >
                <ChatRoom
                  roomName={room.name}
                  lastMessage={getLastMessage(room)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`min-h-screen w-full`}>
        {selectedRoom ? (
          <ChatMessages
            className={`${selectedRoom ? "" : "hidden"}`}
            messages={roomMessages}
            ourSelf={ourSelf}
            room={selectedRoom}
            socket={socket}
            setSelectedRoomNull={() => setSelectedRoom("")}
          />
        ) : (
          <div
            className={`${
              selectedRoom ? "" : "hidden sm:hidden md:grid place-items-center"
            } text-xl min-h-screen`}
          >
            Válaszd ki kivel szeretnél beszélgetni!
          </div>
        )}
      </div>
    </>
  );
};
