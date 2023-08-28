import React, { useEffect, useState } from "react";
import userImg from "../assets/user.jpg";
import { useSelector } from "react-redux";
import useIsAnyUserOnline from "../hooks/useIsAnyUserOnline";
import dayjs from "dayjs";

export const ChatRoom = ({ room, lastMessage, activeUsers, ourSelf }) => {
  const isAnyUserOnline = useIsAnyUserOnline(
    ourSelf,
    activeUsers,
    room.participants
  );
  return (
    <>
      <div className="relative ">
        <img
          src={userImg}
          className="rounded-full min-h-[64px] max-h-[64px] min-w-[64px] max-w-[64px]"
        />
        {isAnyUserOnline == true && (
          <span className="absolute top-1 right-1 p-1.5 bg-green-500 rounded-full"></span>
        )}
      </div>
      <div className="flex flex-row justify-between w-full ml-4">
        <div>
          <p className="text-gray-700 font-medium text-xl">{room.name}</p>
          <span className="text-slate-400">
            {lastMessage.text ? lastMessage.text : "Új beszélgetés indítása..."}
          </span>
        </div>
        <div className="flex items-start">
          <p>{dayjs(lastMessage.createdDate).format("ddd")}</p>
        </div>
      </div>
    </>
  );
};
