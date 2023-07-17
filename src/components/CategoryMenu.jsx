import React, { useEffect } from "react";
import user from "../assets/user.jpg";
import {
  HomeOutlined,
  MessageOutlined,
  LogoutOutlined,
  SettingOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Link, useParams, useSearchParams } from "react-router-dom";

export const CategoryMenu = () => {

  const menuItems = [
    {
      id: "1",
      icon: <HomeOutlined className="text-3xl" />,
      link: "/",
    },
    {
      id: "2",
      icon: <MessageOutlined className="text-3xl" />,
      link: "/chat",
    },
    {
      id: "3",
      icon: <LaptopOutlined className="text-3xl" />,
      link: "/game",
    },
    {
      id: "4",
      icon: <SettingOutlined className="text-3xl" />,
      link: "/settings",
    },
  ];

  return (
    <div className="min-w-[64px] max-w-[64px] min-h-screen border-r-2 flex flex-col justify-between">
      <div className="">
        <img
          src={user}
          alt="User picture"
          className="w-12 h-12 rounded-full mx-auto"
        />
      </div>
      <div className="text-gray-400 flex flex-col">
        {menuItems.map((menuItem) => {
          return (
            <Link
              key={menuItem.id}
              to={menuItem.link}
              className="hover:text-emerald-400 hover:cursor-pointer shadow-slate-600 w-full justify-center align-middle flex py-3"
            >
              {menuItem.icon}
            </Link>
          );
        })}
      </div>
      <div>
        <div className="mb-6 text-gray-400 hover:text-emerald-400 hover:cursor-pointer shadow-slate-600 w-full flex justify-center">
          <LogoutOutlined className="text-3xl" />
        </div>
      </div>
    </div>
  );
};
