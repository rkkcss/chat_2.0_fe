import React, { useEffect, useRef, useState } from "react";
import userImg from "../assets/user.jpg";
import {
  ArrowLeftOutlined,
  EllipsisOutlined,
  FileImageOutlined,
  GifOutlined,
  SmileOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button } from "./Button";
import { API } from "../axios/API";
import { useSelector } from "react-redux";
import useIsAnyUserOnline from "../hooks/useIsAnyUserOnline";
import { TypeingDots } from "../assets/TypingDots/TypeingDots";
import { useOutletContext, useParams } from "react-router-dom";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { Message } from "./Message";

export const ChatMessagesSection = () => {
  dayjs.extend(relativeTime);
  const { room, activeUsers, socket } = useOutletContext();
  const scrollRef = useRef();
  const messageInput = useRef("");

  const [isUserTyping, setIsUserTyping] = useState(false);
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const ourSelf = useSelector((state) => state.userStore.user);

  const isAnyUserOnline = useIsAnyUserOnline(
    ourSelf,
    activeUsers,
    room?.participants
  );
  let timer;

  useEffect(() => {
    API.get(`/api/messages/room/${roomId}`).then((res) => {
      setMessages(res.data);
      console.log(res.data);
    });
  }, [roomId]);

  useEffect(() => {
    socket?.current?.emit("joinRoom", { roomId: roomId });
    socket?.current?.on("userStartTypingToClient", (res) => {
      console.log("tyingres", res);
      if (ourSelf.id == res.user.id && res.roomId == roomId) {
        //clearTimeout(timer);
        return;
      }
      setIsUserTyping(true);
    });

    socket?.current?.on("userStopTypingToClient", () => {
      setIsUserTyping(false);
    });
  }, [socket.current, roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {}, []);

  //save message to db and send to the group via socket
  const sendMessageAndSave = () => {
    API.post(`/api/messages/${roomId}`, {
      text: messageInput.current.value,
    });
    socket.current?.emit("groupMessageToServer", {
      user: {
        id: ourSelf.id,
      },
      text: messageInput.current.value,
      roomId: roomId,
    });
    messageInput.current.value = "";
  };

  //detect the user is typeing
  const userTypeingHandler = () => {
    clearTimeout(timer);

    socket?.current?.emit("userStartTypingToServer", {
      user: {
        id: ourSelf?.id,
      },
      roomId: roomId,
    });

    timer = setTimeout(() => {
      socket?.current?.emit("userStopTypingToServer", {
        user: {
          id: ourSelf?.id,
        },
        roomId: roomId,
      });
    }, 3000);
  };

  useEffect(() => {
    socket?.current?.on("groupMessageToClient", (data) => {
      setMessages([...messages, data]);
    });
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-4xl gap-2">
            <ArrowLeftOutlined className="lg:hidden text-black cursor-pointer" />
            <img
              src={userImg}
              alt=""
              className="rounded-full min-w-[67px] max-w-[67px] min-h-[67px] max-h-[67px]"
            />
          </div>
          <div className="w-full flex items-center justify-between ml-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-700">{room?.name}</h1>

              {isAnyUserOnline ? (
                <span className="text-lg text-emerald-500 font-bold">
                  Elérhető
                </span>
              ) : (
                <span className="text-xl text-gray-400 font-bold">
                  Nem elérhető
                </span>
              )}
            </div>
            <div className="text-4xl">
              <EllipsisOutlined className="hover:bg-green-300 hover:cursor-pointer rounded-full border-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-6 overflow-y-auto relative">
        {messages?.map((message, i) => (
          <Message message={message} key={i} scrollRef={scrollRef} />
        ))}

        <div className={`${isUserTyping ? "block" : "hidden"}`}>
          <span className="flex items-center gap-2 left-3">
            <img src={userImg} alt="" className="w-6 h-6 rounded-full" />
            <TypeingDots />
          </span>
        </div>
      </div>

      <div className="w-full block border-t px-6 pb-4 border-gray-300">
        <div className="py-2 text-xl text-gray-400 gap-9 flex">
          <FileImageOutlined className="hover:text-emerald-400 hover:cursor-pointer py-2" />
          <VideoCameraOutlined className="hover:text-emerald-400 hover:cursor-pointer py-2" />
          <GifOutlined className="hover:text-emerald-400 hover:cursor-pointer py-2" />
          <SmileOutlined className="hover:text-emerald-400 hover:cursor-pointer py-2" />
        </div>
        <div className="flex flex-grow gap-5 justify-between w-full">
          <input
            type="text"
            placeholder="Üzenet..."
            className="shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
            ref={messageInput}
            onChange={userTypeingHandler}
          />

          <div onClick={sendMessageAndSave}>
            <Button type={"primary"} text={"Küld"} />
          </div>
        </div>
      </div>
    </div>
  );
};
