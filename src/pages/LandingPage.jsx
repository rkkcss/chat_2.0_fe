import { useEffect, useRef } from "react";
import { CategoryMenu } from "../components/CategoryMenu";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { handleActiveUsersList } from "../redux/activeUsersSlice";

export const LandingPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);
  let socket = useRef();

  useEffect(() => {
    socket.current = io("ws://192.168.0.26:8085");

    socket?.current.on("getActiveUsers", (userList) =>
      dispatch(handleActiveUsersList(userList))
    );
    socket?.current.emit("getUserId", user.id);

    return () => {
      socket?.current.off("getActiveUsers", (userList) =>
        dispatch(handleActiveUsersList(userList))
      );
      socket?.current.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-row h-screen">
      <CategoryMenu />
      <Outlet
        context={{
          socket: socket,
        }}
      />
    </div>
  );
};
