import React, { useEffect, useRef, useState } from "react";
import userImg from "../assets/user.jpg";
import { ArrowLeftOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button } from "./Button";
import { API } from "../axios/API";
import { useSelector } from "react-redux";

export const ChatMessages = ({
  messages,
  ourSelf,
  room,
  socket,
  setSelectedRoomNull,
}) => {
  const scrollRef = useRef();
  const messageInput = useRef("");
  const user = useSelector((state) => state.userStore.user);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //save message to db and send to the group via socket
  const sendMessageAndSave = () => {
    API.post(`/api/messages/${room.id}`, {
      text: messageInput.current.value,
    }).then((res) => {});
    socket.current.emit("groupMessageToServer", {
      user: {
        id: ourSelf.id,
      },
      text: messageInput.current.value,
      roomId: room.id,
    });
    messageInput.current.value = "";
  };
  console.log("messages", messages);
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-4xl gap-2">
            <ArrowLeftOutlined
              className="lg:hidden text-black cursor-pointer"
              onClick={setSelectedRoomNull}
            />
            <img
              src={userImg}
              alt=""
              className="rounded-full min-w-[67px] max-w-[67px] min-h-[67px] max-h-[67px]"
            />
          </div>
          <div className="w-full flex items-center justify-between ml-3">
            <div>
              <h1 className="text-4xl font-bold">{room.name}</h1>
              <span className="text-xl text-emerald-500 font-bold">
                Elérhető
              </span>
            </div>
            <div className="text-4xl">
              <EllipsisOutlined className="hover:bg-green-300 hover:cursor-pointer rounded-full border-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-6 overflow-y-auto">
        {messages.map((message, i) =>
          message.user?.id === ourSelf?.id ? (
            <div
              key={i}
              className="flex justify-end text-lg my-2"
              ref={scrollRef}
            >
              <span className="rounded-2xl p-2.5 border-2 bg-white max-w-[80%]">
                {message.text}
              </span>
            </div>
          ) : (
            <div
              key={i}
              className="flex justify-start text-lg my-2"
              ref={scrollRef}
            >
              <span className="rounded-2xl p-2.5 bg-emerald-300  max-w-[80%]">
                {message.text}
              </span>
            </div>
          )
        )}
      </div>

      <div className="w-full flex border-t p-6 border-gray-300">
        <div className="flex-grow pr-5">
          <input
            type="text"
            placeholder="Üzenet..."
            className="shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
            ref={messageInput}
          />
        </div>
        <div onClick={sendMessageAndSave}>
          <Button type={"primary"} text={"Küld"} />
        </div>
      </div>
    </div>
  );
};
