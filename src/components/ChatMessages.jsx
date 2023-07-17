import React, { useEffect } from "react";
import user from "../assets/user.jpg";
import {
  BarsOutlined,
  EllipsisOutlined,
  FileImageOutlined,
  LeftOutlined,
  PhoneOutlined,
  SettingOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button } from "./Button";
import { io } from "socket.io-client";



export const ChatMessages = () => {
  

  useEffect(() => {
    const socket = io('http://192.168.0.18:8085', {
      reconnection: false,
    });
    socket.on('connect', () => {
      console.log('connect...')
    });
    return () => {
      socket.off('disconnect')
    }
  },[])

  return (
    <div className="min-h-screen w-full">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b">
          <div className="mt-4 flex items-center justify-between">
            <div>
              <img
                src={user}
                alt=""
                className="rounded-full min-w-[96px] max-w-[96px] min-h-[96px] max-h-[96px]"
              />
            </div>
            <div className="w-full flex items-center justify-between ml-3">
              <div>
                <h1 className="text-4xl font-bold">Kiss Jani</h1>
                <span className="text-xl text-emerald-500 font-bold">
                  Elérhető
                </span>
              </div>
              <div className="text-4xl">
                <EllipsisOutlined />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="text-3xl rounded-full border-gray-300 border-2 flex text-gray-400">
                <div className="py-3 px-5 items-center flex hover:cursor-pointer hover:text-emerald-400">
                  <PhoneOutlined />
                </div>
                <div className="py-3 px-5 items-center flex hover:cursor-pointer hover:text-emerald-400">
                  <VideoCameraOutlined />
                </div>
                <div className="py-3 px-5 items-center flex hover:cursor-pointer hover:text-emerald-400">
                  <FileImageOutlined />
                </div>
                <div className="py-3 px-5 items-center flex hover:cursor-pointer hover:text-emerald-400">
                  <SettingOutlined />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow p-6 overflow-y-auto">
          <div className="flex justify-start text-lg my-2">
            <span className="rounded-2xl p-2.5 bg-emerald-300  max-w-[80%]">
              Szia buzigyerek mi a szar van veled? nem is tudom miota nem voltál
              Szia buzigyerek mi a szar van veled? nem is tudom miota nem voltál
              Szia buzigyerek mi a szar van veled? nem is tudom miota nem
              voltálSzia buzigyerek mi a szar van veled? nem is tudom miota nem
              voltál
            </span>
          </div>
          <div className="flex justify-end text-lg my-2 ">
            <span className="rounded-2xl p-2.5 border-2 bg-white max-w-[80%]">
              Szia buzigyerek mi a szar van veled? nem is tudom miota nem voltál
              Szia buzigyerek mi a szar van veled? nem is tudom miota nem voltál
              Szia buzigyerek mi a szar van veled? nem is tudom miota nem voltál
            </span>
          </div>

          <div className="flex justify-start text-lg my-2">
            <span className="rounded-2xl p-2.5 bg-emerald-300 max-w-[80%]">
              Szia buzigyerek mi a szar van veled? nem is tudom miota nem voltál
              Szia buzigyerek mi a szar van veled? nem is tudom miota nem voltál
              Szia buzigyerek mi a szar van veled? nem is tudom miota nem
              voltálSzia buzigyerek mi a szar van veled? nem is tudom miota nem
              voltál
            </span>
          </div>
        </div>

        <div className="w-full flex border-t p-6 border-gray-300">
          <div className="flex-grow pr-5">
            <input
              type="text"
              placeholder="Üzenet..."
              className="shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
            />
          </div>
          <div>
            <Button type={"primary"} text={"Küld"} />
          </div>
        </div>
      </div>
    </div>
  );
};
