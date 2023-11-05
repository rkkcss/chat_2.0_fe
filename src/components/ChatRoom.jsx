import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useIsAnyUserOnline from "../hooks/useIsAnyUserOnline";
import moment from "moment/min/moment-with-locales";
import { UserBubbleImageDisplayer } from "./UserBubbleImageDisplayer";
import useHandleRoomName from "../hooks/useHandleRoomName";

const messageTypes = {
  image: "Fényképet küldött",
  empty: "Nincs még beszélgetés",
};

export const ChatRoom = ({ room }) => {
  const messageText = () => {
    if (room.lastMessage?.text.includes("dmvkh8wxf")) {
      return messageTypes.image;
    } else if (
      room.lastMessage?.text == undefined ||
      room.lastMessage?.text == null
    ) {
      return messageTypes.empty;
    }
    return room.lastMessage?.text.slice(0, 40) + "...";
  };

  const isAnyUserOnline = useIsAnyUserOnline(room.participants);
  const [participantUsers, setParticipantUsers] = useState([]);

  useEffect(() => {
    const participantList = room.participants.map((participant) => {
      return { ...participant.user };
    });
    setParticipantUsers(participantList);
  }, []);

  return (
    <>
      <div className="relative">
        <UserBubbleImageDisplayer
          users={participantUsers}
          isOnlineBubble={isAnyUserOnline}
        />
      </div>
      <div className="flex flex-col justify-between w-full ml-4">
        <div className="flex justify-between">
          <p className="text-gray-700 font-medium text-xl dark:text-slate-100">
            {useHandleRoomName(room.name, room.participants)}
          </p>
          <p className="text-sm mt-1 dark:text-slate-100 text-gray-400">
            {room.lastMessage?.createdDate &&
              moment(room.lastMessage.createdDate).calendar()}
          </p>
        </div>
        <div className="flex items-start">
          <span className="text-slate-400 dark:text-slate-300">
            {messageText()}
          </span>
        </div>
      </div>
    </>
  );
};

ChatRoom.propTypes = {
  room: PropTypes.object.isRequired,
};
