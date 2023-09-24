import React, { useState } from "react";
import { useSelector } from "react-redux";
import userImg from "../assets/user.jpg";
import { MoreOutlined, SmileOutlined } from "@ant-design/icons";

export const Message = ({ message, lastMessageRef }) => {
  const user = useSelector((state) => state.userStore.user);

  return message.user?.id === user?.id ? (
    <div
      ref={lastMessageRef}
      className="flex justify-end text-lg py-1 group gap-2"
    >
      <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100 relative">
        <SmileOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
        <MoreOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
      </div>
      <div className="rounded-xl p-2 border-2 bg-white max-w-[80%]">
        <span>{message.text}</span>
      </div>
    </div>
  ) : (
    <div
      ref={lastMessageRef}
      className="flex justify-start text-lg py-2 items-center gap-2 group"
    >
      <img src={userImg} alt="user" className="w-9 h-9 rounded-full" />
      <div className="rounded-xl p-2 bg-emerald-300  max-w-[80%]">
        <span className="">{message.text}</span>
      </div>
      <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100">
        <SmileOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
        <MoreOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
      </div>
    </div>
  );
};
