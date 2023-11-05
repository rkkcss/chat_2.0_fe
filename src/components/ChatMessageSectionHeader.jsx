import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedRoom } from "../redux/roomSlice";
import { UserBubbleImageDisplayer } from "./UserBubbleImageDisplayer";
import { LeftOutlined, MoreOutlined } from "@ant-design/icons";
import useIsAnyUserOnline from "../hooks/useIsAnyUserOnline";
import useHandleRoomName from "../hooks/useHandleRoomName";

export const ChatMessageSectionHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedRoom } = useSelector((state) => state.roomStore);
  const { user } = useSelector((state) => state.userStore);
  const { roomId } = useParams();

  const [participantUsers, setParticipantUsers] = useState([]);

  const navigateBackToChatSelection = () => {
    dispatch(setSelectedRoom(null));
    navigate("/chat");
  };

  const isAnyUserOnline = useIsAnyUserOnline(selectedRoom?.participants);

  const filterParticipantsForOnlyUsers = () => {
    const participantList = selectedRoom.participants.map((participant) => {
      return { ...participant.user };
    });
    setParticipantUsers(participantList);
  };

  useEffect(() => {
    filterParticipantsForOnlyUsers();
  }, [roomId]);

  return (
    <div className="py-3 pl-5 pr-6 border-b">
      <div className="flex items-center justify-between">
        <LeftOutlined
          className="lg:hidden mr-4 text-slate-700 text-2xl cursor-pointer"
          onClick={() => navigateBackToChatSelection()}
        />
        <div className="relative">
          <UserBubbleImageDisplayer users={participantUsers} />
        </div>
        <div className="w-full flex items-center justify-between ml-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-700">
              {useHandleRoomName(
                selectedRoom?.name,
                selectedRoom?.participants
              )}
            </h1>

            {isAnyUserOnline ? (
              <span className="text-sm text-emerald-500 font-bold">
                Elérhető
              </span>
            ) : (
              <span className="text-sm text-gray-400 font-bold">
                Nem elérhető
              </span>
            )}
          </div>
          <div className=" relative">
            <MoreOutlined className="text-3xl text-slate-600 cursor-pointer border rounded-lg p-0.5 hover:bg-gray-100 flex" />
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-emerald-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  Account settings
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-emerald-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-emerald-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                >
                  License
                </a>
                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-emerald-300"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-3"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
