import React, { useState } from "react";
import { useSelector } from "react-redux";
import userImg from "../assets/user.jpg";
import { MoreOutlined, SmileOutlined } from "@ant-design/icons";

export const Message = ({ message, scrollRef }) => {
  const user = useSelector((state) => state.userStore.user);

  return message.user?.id === user?.id ? (
    <div className="flex justify-end text-lg py-3 group gap-2" ref={scrollRef}>
      <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100 relative">
        <SmileOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
        <MoreOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
      </div>
      <div>
        <span className="rounded-2xl p-2.5 border-2 bg-white max-w-[80%]">
          {message.text}
        </span>
      </div>
    </div>
  ) : (
    <div
      className="flex justify-start text-lg py-2 items-center gap-2
          group
          "
      ref={scrollRef}
    >
      <img src={userImg} alt="user" className="w-9 h-9 rounded-full" />
      <div className="">
        <span className="rounded-2xl p-2.5 bg-emerald-300  max-w-[80%]">
          {message.text}
        </span>
      </div>
      <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100">
        <SmileOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
        <MoreOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
      </div>
    </div>
  );
};
