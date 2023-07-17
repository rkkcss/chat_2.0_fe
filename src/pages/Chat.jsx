import React from "react";
import { SettingOutlined, CheckOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "../components/Button";
import user from "../assets/user.jpg";
import { ChatMessages } from "../components/ChatMessages";

export const Chat = () => {
  return (
    <>
      <div className="max-w-[500px] min-w-[500px] border-r-2 p-7 hidden lg:block">
        <div className="h-full border rounded-lg p-4 mb-2">
          <div className="border-b flex justify-between items-start">
            <h1 className="font-bold text-2xl mb-3">Message</h1>
            <PlusCircleOutlined className="text-2xl hover:cursor-pointer hover:text-green-300"/>
          </div>
          <div>
            <div className="flex flex-row border-b py-5">
              <div className="">
                <img
                  src={user}
                  className="rounded-full min-h-[64px] max-h-[64px] min-w-[64px] max-w-[64px]"
                />
              </div>
              <div className="flex flex-row justify-between w-full ml-4">
                <div>
                  <p className="text-gray-700 font-medium text-xl">Kiss Jani</p>
                  <span className="text-slate-400">
                    Mi van veled? ezer éve az igen
                  </span>
                </div>
                <div className="flex items-center">
                  <p>12:44 AM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row border-b py-5">
              <div className="">
                <img
                  src={user}
                  className="rounded-full min-h-[64px] max-h-[64px] min-w-[64px] max-w-[64px]"
                />
              </div>
              <div className="flex flex-row justify-between w-full ml-4">
                <div>
                  <p className="text-gray-700 font-medium text-xl">Kiss Jani</p>
                  <span className="text-slate-400">
                    Mi van veled? ezer éve az igen
                  </span>
                </div>
                <div className="flex items-center">
                  <p>12:44 AM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row border-b py-5">
              <div className="">
                <img
                  src={user}
                  className="rounded-full min-h-[64px] max-h-[64px] min-w-[64px] max-w-[64px]"
                />
              </div>
              <div className="flex flex-row justify-between w-full ml-4">
                <div>
                  <p className="text-gray-700 font-medium text-xl ">Kiss Jani</p>
                  <span className="text-slate-400 ">
                    Mi van veled? ezer éve az igen
                  </span>
                </div>
                <div className="flex items-center">
                  <p>12:44 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ChatMessages />
    </>
  );
};
