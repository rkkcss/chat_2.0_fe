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
          <div className="text-3xl">
            <MoreOutlined className="text-slate-600 cursor-pointer border rounded-lg p-0.5 hover:bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};
