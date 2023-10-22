import React, { useState } from "react";
import { useSelector } from "react-redux";
import userImg from "../assets/user.jpg";
import {
  ExclamationCircleOutlined,
  MoreOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import noImage from "../assets/noImage.png";

export const Message = ({ message, lastMessageRef }) => {
  const user = useSelector((state) => state.userStore.user);

  return message.user?.id === user?.id ? (
    <div
      ref={lastMessageRef}
      className="flex justify-end text-lg py-0.5 group gap-2"
    >
      <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100 relative">
        <SmileOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
        <MoreOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
      </div>
      {message.text.includes("dmvkh8wxf") ? (
        <img
          src={message.text}
          alt="img"
          className="max-h-[200px] max-w-[90%]"
          onError={(e) => {
            e.target.onError = null;
            //HERE WE NEED IMAGE WHEN IMG IS NOT AVAILABLE
            //e.target.src = noImage;
          }}
        />
      ) : (
        <div className="rounded-xl py-1.5 px-2 border-2 bg-white max-w-[80%]">
          <span className="break-all">{message.text}</span>
        </div>
      )}
    </div>
  ) : (
    <div
      ref={lastMessageRef}
      className="flex justify-start text-lg py-1 items-center gap-2 group"
    >
      <img src={userImg} alt="user" className="w-9 h-9 rounded-full" />
      {message.text.includes("dmvkh8wxf") ? (
        <img src={message.text} alt="img" className="w-[400px]" />
      ) : (
        <div className="rounded-xl py-1.5 px-2 bg-emerald-300  max-w-[80%]">
          <span className="break-all">{message.text}</span>
        </div>
      )}
      <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100">
        <SmileOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
        <MoreOutlined className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200" />
      </div>
    </div>
  );
};
