import { useRef, useState } from "react";
import { Button } from "./Button";
import userImg from "../assets/user.jpg";
import { InfoCircleOutlined } from "@ant-design/icons";
import { API } from "../axios/API";
import Select from "react-tailwindcss-select";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Divider } from "./Divider";
import { useDispatch } from "react-redux";
import { setSelectedRoom } from "../redux/roomSlice";
import { UserBubbleImageDisplayer } from "./UserBubbleImageDisplayer";

export const CreateNewChat = () => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [existsRoom, setExistsRoom] = useState(null);
  const { room } = useOutletContext();
  const navigate = useNavigate();
  const roomNameRef = useRef("");
  const dispatch = useDispatch();

  const navigateToChatRoom = () => {
    dispatch(setSelectedRoom(existsRoom));
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
    API.post("/api/rooms", {
      users: selectedUsers,
      room: { name: roomNameRef.current.value },
    })
      .then((res) => {
        toast.success("Sikeresen létrejött a beszélgetés!");
      })
      .catch((res) => {
        if (res?.response?.status == 302) {
          setExistsRoom(res.response.data);
        }
      });
  };
  console.log("room", room);
  return (
    <div className="p-6 flex gap-4 flex-col">
      <p className="text-3xl text-gray-600">Csevegés létrehozása</p>
      <div className="w-full">
        <label className="text-lg font-medium text-gray-500">Szoba neve:</label>
        <input
          type="text"
          ref={roomNameRef}
          className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
          placeholder="Írd a szoba nevét..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-500">
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
          <Divider text={"információ"} />
          <label className="text-lg font-medium text-gray-600 border-2 bg-emerald-300 border-emerald-400 rounded-md p-2 ">
            <span className="flex items-center gap-3 text-xl mb-2">
              <InfoCircleOutlined className="text-3xl flex items-center" />
              <span>Van találat</span>
            </span>
            <p className="text-sm">
              Van már olyan szoba, ahol ezek a személyekkel beszélgetsz. Alább
              találod meg a szobát és ha üzenni szeretnél nekik, kattints a
              szobára.
            </p>
          </label>
          <div className="flex justify-start ">
            <div
              onClick={navigateToChatRoom}
              className="flex flex-row bg-gray-200/70 p-2 rounded-xl min-w-[200px] cursor-pointer w-full hover:bg-gray-300/50 hover:outline hover:outline-1 hover:outline-gray-200"
            >
              <div className="flex gap-4">
                <div>
                  {/* <img
                    src={userImg}
                    className="rounded-full w-20 h-20"
                    alt="ChatImg"
                  /> */}
                  {console.log(existsRoom.participants)}
                  <UserBubbleImageDisplayer
                    participants={existsRoom.participants}
                  />
                </div>

                <div className="flex flex-col justify-around">
                  <h1 className="text-gray-800 text-2xl">{existsRoom.name}</h1>
                  <p className="text-gray-600">
                    {existsRoom.participants.length - 1} emberrel
                  </p>
                </div>
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
  );
};
