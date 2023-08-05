import React, { useEffect, useRef, useState } from "react";
import userImg from "../assets/user.jpg";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { API } from "../axios/API";

export const NewChat = ({ onOpen, onClose }) => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const roomName = useRef("");

  const searchInputOnchange = (e) => {
    if (e.target.value === "") {
      setSearchedUsers([]);
      return;
    }
    API.get(`/api/users/search?searchName=${e.target.value}`).then((res) => {
      setSearchedUsers(res.data);
    });
  };

  const handleSelectedUsersOnClick = (e) => {
    const isUserInTheList = (element) => element.id === e.id;
    if (selectedUsers.some(isUserInTheList)) {
      let newUser = selectedUsers.filter((user) => user.id !== e.id);
      setSelectedUsers(newUser);
    } else {
      setSelectedUsers([...selectedUsers, e]);
    }
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
      room: { name: roomName.current.value },
    }).then((res) => {
      console.log("sikeres");
    });
  };

  return (
    <div
      className={`relative z-10 ${onOpen ? "block" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-6">
            <h1 className="text-2xl text-gray-600">Beszélgetés létrehozás</h1>
            <div className="bg-white pb-1 pt-2 gap-2 flex flex-col">
              <label className="text-gray-600">
                Csoport neve <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-300 focus:border-emerald-300 block w-full p-2.5"
                placeholder="Csoport neve..."
                ref={roomName}
              />
            </div>
            <div className="bg-white pt-1 gap-2 flex flex-col pb-5 relative">
              <label className="text-gray-600">
                Tagok <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-300 focus:border-emerald-300 block w-full p-2.5"
                placeholder="Tagok keresése..."
                onChange={(e) => searchInputOnchange(e)}
              />

              {/* DROPDOWN */}
              <div
                className={`origin-top-right absolute 
              left-0 w-full max-h-48 
              top-20
              rounded-md shadow-lg 
              bg-white ring-1 
              ring-black 
              ring-opacity-5 
              divide-y 
              divide-gray-100 
              ${searchedUsers.length > 0 ? "block" : "hidden"}
              `}
              >
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {searchedUsers.map((user) => {
                    return (
                      <div
                        key={user?.user?.id}
                        className="cursor-pointer 
                        flex w-full 
                        justify-between
                        text-left px-4 py-2 
                        text-sm text-gray-700 
                        hover:bg-gray-100 
                        focus:bg-gray-100 
                        focus:outline-none 
                        items-center"
                        role="menuitem"
                        onClick={() => handleSelectedUsersOnClick(user)}
                      >
                        <div className="flex gap-2">
                          <img
                            src={userImg}
                            className="w-4 h-4 rounded-full"
                            alt=""
                          />
                          {user?.firstName + " " + user?.lastName}
                        </div>
                        <div className="flex items-center">
                          {selectedUsers.includes(user) && (
                            <CheckCircleOutlined />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {selectedUsers.map((selectedUser, i) => {
                return (
                  <div className="bg-white" key={i}>
                    <div className="p-2 bg-gray-100 border border-gray-300 rounded-md flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <img src={userImg} className="rounded w-7 h-7" />
                        <h1>{selectedUser?.lastName?.slice(0, 17)}</h1>
                      </div>
                      <div>
                        <DeleteOutlined
                          className="text-red-600 text-lg hover:text-red-700 hover:cursor-pointer"
                          onClick={() => filterSelectedUser(selectedUser)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t-gray-300 border-t  py-3 sm:flex mt-3 flex justify-between">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 sm:w-auto"
                onClick={handleSubmit}
              >
                Létrehozás
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                Mégse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
