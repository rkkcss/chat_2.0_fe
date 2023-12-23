import React from "react";
import { useSelector } from "react-redux";
import noImage from "../assets/noImage.png";
import { MoreOutlined, SmileOutlined } from "@ant-design/icons";
import moment from "moment/min/moment-with-locales";
import userDefault from "../assets/userDefault.jpg";

export const Message = ({ message, lastMessageRef }) => {
  const user = useSelector((state) => state.userStore.user);

  return message.user?.id === user?.id ? (
    <div ref={lastMessageRef} className="flex justify-end py-0.5 group gap-2">
      <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100 relative">
        <SmileOutlined
          className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200"
          style={{ fontSize: "18px" }}
        />
        <MoreOutlined
          className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200"
          style={{ fontSize: "18px" }}
        />
      </div>
      {message.text.includes("dmvkh8wxf") ? (
        <img
          src={message.text}
          alt="img"
          className="max-h-[200px] max-w-[90%]"
          onError={({ currentTarget }) => {
            currentTarget.src = userDefault;
          }}
        />
      ) : (
        <div className="rounded-xl py-1.5 px-2 border bg-white max-w-[80%]">
          {message.text}
        </div>
      )}
    </div>
  ) : (
    <div className="group" ref={lastMessageRef}>
      <div className="flex gap-2 max-w-[80%] ">
        <div className="flex items-end min-w-[36px]">
          <img
            src={message.user.imageUrl}
            alt="user"
            className="w-9 h-9 rounded-full"
            onError={({ currentTarget }) => {
              currentTarget.src = userDefault;
            }}
          />
        </div>
        <div className="flex flex-col">
          <div>
            <span className="text-xs">{message.user.firstName}</span>
            <span className="text-xs ml-3">
              {moment(message.createdDate).format("lll")}
            </span>
          </div>
          <div className="flex gap-2">
            {message.text.includes("dmvkh8wxf") ? (
              <img
                src={message.text}
                alt="img"
                className="max-h-[200px] w-fit"
              />
            ) : (
              <div className="rounded-xl py-1.5 px-2 bg-emerald-300 w-fit">
                {message.text}
              </div>
            )}
            <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100">
              <SmileOutlined
                className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200"
                style={{ fontSize: "18px" }}
              />
              <MoreOutlined
                className="hover:rounded-full hover:cursor-pointer p-1 hover:bg-gray-200"
                style={{ fontSize: "18px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
