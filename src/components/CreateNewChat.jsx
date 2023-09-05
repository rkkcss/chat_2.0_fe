import React, { useState } from "react";
import { Button } from "./Button";
import userImg from "../assets/user.jpg";
import lib, { DeleteOutlined } from "@ant-design/icons";
import { API } from "../axios/API";
import Select from "react-tailwindcss-select";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export const CreateNewChat = (props) => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [existsRoom, setExistsRoom] = useState(null);
  const { room, setSelectedRoom } = useOutletContext();
  const navigate = useNavigate();

  const navigateToChatRoom = () => {
    setSelectedRoom(existsRoom);
    navigate(`/chat/${existsRoom.id}`);
  };

  const searchInputOnchange = (e) => {
    console.log(e.target.value);

    setSearchedUsers([]);
    if (e.target.value === "") {
      return;
    }

    API.get(`/api/users/search?searchName=${e.target.value}`).then((res) => {
      res.data.map((user) => {
        console.log("log", user);
        let result = {
          id: user.id,
          label: user.firstName + " " + user.lastName,
          value: user.id,
        };
        console.log(result);
        setSearchedUsers((prev) => [...prev, result]);
      });
    });
  };

  const handleSelectedUsersOnClick = (e) => {
    setSelectedUsers(e);
  };

  const filterSelectedUser = (user) => {
    setSelectedUsers((current) =>
      current.filter((selectedUser) => selectedUser.id !== user.id)
    );
  };
  //

  const handleSubmit = () => {
    console.log("su", {
      name: "asd",
      participants: selectedUsers,
    });
    API.post("/api/rooms", {
      users: selectedUsers,
      room: { name: "teszt szoba" },
    }).then((res) => {
      setExistsRoom(res.data);
    });
  };
  console.log("room", room);
  return (
    <>
      <div className="p-6 flex gap-4 flex-col">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-600">
            Címzett(ek):
          </label>
          <Select
            isClearable
            classNames={{
              listGroupLabel:
                "mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline",
            }}
            formatOptionLabel={(data) => (
              <li
                className={`block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded`}
              >
                {data.label}
              </li>
            )}
            value={selectedUsers}
            options={searchedUsers}
            isSearchable
            onSearchInputChange={(e) => searchInputOnchange(e)}
            isMultiple
            onChange={handleSelectedUsersOnClick}
          ></Select>
        </div>
        {existsRoom && (
          <>
            <label className="text-lg font-medium text-gray-600">
              Van már ilyen szoba:
            </label>
            <div className="flex justify-start ">
              <div
                onClick={navigateToChatRoom}
                className="flex gap-3 justify-between flex-row items-center text-lg bg-gray-200/70 p-2 rounded-xl min-w-[200px] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={userImg}
                    alt=""
                    className="rounded-full w-11 h-11"
                  />
                  <div>{existsRoom.name}</div>
                </div>
                <div className="hover:bg-gray-300 hover:cursor-pointer hover:rounded-full px-2 py-1 flex items-center">
                  <DeleteOutlined className="text-red-800 text-xl " />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-end">
          <Button
            text={"Létrehozás"}
            type={"button"}
            onClick={handleSubmit}
          ></Button>
        </div>
      </div>
    </>
  );
};
