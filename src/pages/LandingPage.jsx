import React, { useEffect, useRef, useState } from "react";
import { CategoryMenu } from "../components/CategoryMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";

export const LandingPage = () => {
  const ourSelf = useSelector((state) => state.userStore.user);
  const [activeUsers, setActiveUsers] = useState([]);
  let socket = useRef();

  useEffect(() => {
    socket.current = io("ws://192.168.0.26:8085");
    const handleGetActiveUsers = (userList) => handleGetActiveUsers(userList);
    const activeUsersListener = (userList) => {
      const newList = Object.keys(userList).map((userId) => ({
        id: userId,
        sessionId: userList[userId],
      }));
      setActiveUsers(newList);
    };
    socket?.current.on("getActiveUsers", activeUsersListener);
    socket.current.emit("getUserId", ourSelf.id);
    return () => {
      socket.current.off("getActiveUsers", activeUsersListener);
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-row h-screen">
      <CategoryMenu />
      <Outlet
        context={{
          activeUsers: activeUsers,
          socket: socket,
        }}
      />
    </div>
  );
};
