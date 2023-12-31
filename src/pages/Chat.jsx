import React, { useEffect, useState } from "react";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { API } from "../axios/API";
import { ChatRoom } from "../components/ChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { SearchInUsers } from "../components/SearchInUsers";
import {
  Link,
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Tooltip } from "../components/Tooltip";
import { setSelectedRoom } from "../redux/roomSlice";

export const Chat = () => {
  const location = useLocation();
  const { socket } = useOutletContext();
  const { roomId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    API.get("/api/rooms").then((res) => {
      setRooms(res.data);
    });
  }, []);

  const searchUsers = (e) => {
    setSearchInput(e.target.value);

    setTimeout(() => {
      API.get(`/api/users/search?searchName=${searchInput}`).then((res) => {
        setRooms(res.data);
      });
    }, 500);
  };

  // useEffect(() => {
  //   return rooms.find((room) => {
  //     if (room.id == roomId) {
  //       return setSelectedRoom(room);
  //     }
  //   });
  // }, [rooms, roomId]);

  return (
    <>
      <div
        className={`sm:min-w-[500px] lg:max-w-[500px] w-screen border-r-2 dark:border-zinc-600 p-7 ${
          roomId || location.pathname == "/chat/new" ? "hidden lg:block" : ""
        }`}
      >
        <div className="h-full border rounded-lg dark:border-zinc-600">
          <div className="border-b py-4 px-4 flex items-center justify-between flex-col gap-3">
            <div className="flex justify-between items-center w-full h-full">
              <h1 className="font-bold text-2xl text-gray-700 dark:text-slate-100">
                Üzenetek
              </h1>
              <Tooltip tooltipMessage={"Új üzenet"} textPosition={"right"}>
                <Link to={"/chat/new"}>
                  <PlusCircleOutlined
                    className="text-2xl
                    text-gray-700 
                hover:cursor-pointer 
                hover:text-green-300"
                  />
                </Link>
              </Tooltip>
            </div>
            <SearchInUsers
              searchInput={searchInput}
              handleInputChange={(e) => searchUsers(e)}
            />
          </div>
          <div className="overflow-y-auto h-[calc(100%-119px)]">
            {rooms.map((room) => (
              <Link
                to={"/chat/" + room.id}
                className={`flex flex-row hover:cursor-pointer mx-2 p-4 ${
                  room.id == roomId
                    ? "bg-emerald-300 rounded-lg dark:bg-emerald-700"
                    : "hover:bg-gray-100 rounded-lg dark:hover:bg-zinc-600"
                }`}
                key={room.id}
                onClick={() => dispatch(setSelectedRoom(room))}
              >
                <ChatRoom room={room} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`min-h-screen w-full ${
          roomId || location.pathname == "/chat/new" ? "block" : "hidden"
        }`}
      >
        <div className="h-full flex flex-col">
          <Outlet
            context={{
              socket: socket,
            }}
          />
        </div>
      </div>
    </>
  );
};
