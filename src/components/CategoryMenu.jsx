import React, { useEffect, useState } from "react";
import user from "../assets/user.jpg";
import sunIcon from "../assets/sun-theme.svg";
import {
  HomeOutlined,
  MessageOutlined,
  LogoutOutlined,
  SettingOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import moonIcon from "../assets/moon-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/authSlice";

export const CategoryMenu = () => {
  const { theme } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

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

  const changeTheme = () => {
    dispatch(toggleTheme(theme == "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-w-[64px] max-w-[64px] min-h-screen border-r-2 flex flex-col justify-between">
      <div>
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
      <div className="flex flex-col gap-5">
        <div className="flex justify-center">
          {theme === "dark" ? (
            <img
              src={sunIcon}
              alt=""
              className="w-10 h-10 hover:cursor-pointer"
              onClick={changeTheme}
            />
          ) : (
            <img
              src={moonIcon}
              alt=""
              className="w-8 h-8 hover:cursor-pointer"
              onClick={changeTheme}
            />
          )}
        </div>
        <Link
          to={"/logout"}
          className="mb-6 text-gray-400 hover:text-emerald-400 hover:cursor-pointer shadow-slate-600 w-full flex justify-center"
        >
          <LogoutOutlined className="text-3xl" />
        </Link>
      </div>
    </div>
  );
};
