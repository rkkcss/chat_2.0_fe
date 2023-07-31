import React from 'react';
import user from "../assets/user.jpg";

export const ChatRoom = ({name}) => {
  return (
    <>
        <div>
            <img
            src={user}
            className="rounded-full min-h-[64px] max-h-[64px] min-w-[64px] max-w-[64px]"
            />
        </div>
        <div className="flex flex-row justify-between w-full ml-4">
            <div>
            <p className="text-gray-700 font-medium text-xl">{name}</p>
            <span className="text-slate-400">
                {name}
            </span>
            </div>
            <div className="flex items-center">
            <p>12:44 AM</p>
            </div>
        </div>
    </>
  )
}
