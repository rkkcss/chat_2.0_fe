import React, { useEffect, useState } from 'react';
import userImg from "../assets/user.jpg";
import { useSelector } from 'react-redux';

export const ChatRoom = ({roomName, lastMessage}) => {
  console.log(roomName)
  return (
    <>
        <div>
            <img
            src={userImg}
            className="rounded-full min-h-[64px] max-h-[64px] min-w-[64px] max-w-[64px]"
            />
        </div>
        <div className="flex flex-row justify-between w-full ml-4">
            <div>
            <p className="text-gray-700 font-medium text-xl">{roomName}</p>
            <span className="text-slate-400">
              {lastMessage}
            </span>
            </div>
            <div className="flex items-center">
            <p>12:44 AM</p>
            </div>
        </div>
    </>
  )
}
