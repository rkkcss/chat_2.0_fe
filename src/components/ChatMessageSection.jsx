import React, { useCallback, useEffect, useRef, useState } from "react";
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
import InputEmoji from "react-input-emoji";
import usePagination from "../hooks/usePaginationHook";

export const ChatMessagesSection = () => {
  dayjs.extend(relativeTime);
  const { room, activeUsers, socket } = useOutletContext();
  const [messageInput, setMessageInput] = useState("");

  const [isUserTyping, setIsUserTyping] = useState(false);
  const { roomId } = useParams();
  const [messages, setMessages] = useState(new Map());
  const ourSelf = useSelector((state) => state.userStore.user);

  const { pagination, setPagination, loading, lastElementRef, setLoading } =
    usePagination();

  const isAnyUserOnline = useIsAnyUserOnline(
    ourSelf,
    activeUsers,
    room?.participants
  );

  useEffect(() => {
    socket?.current?.on("userStartTypingToClient", (res) => {
      if (res.roomId == roomId && ourSelf.id != res.user.id) {
        setIsUserTyping(true);
      }
    });
    socket?.current?.on("userStopTypingToClient", () => {
      setIsUserTyping(false);
    });
  }, [socket.current]);

  const fetchMessages = async (pageNumber) => {
    await API.get(`/api/messages/room/${roomId}`, {
      params: { page: pageNumber },
    })
      .then((res) => {
        console.log(res.data.content);
        setMessages(
          (prev) =>
            new Map([...prev, ...res.data.content.map((msg) => [msg.id, msg])])
        );
        setPagination((prev) => ({ ...prev, last: res.data.last }));
        console.log("uj", messages);
      })
      .finally((e) => {});
  };

  useEffect(() => {
    if (pagination.page === 0) {
      return;
    }
    setTimeout(() => {
      fetchMessages(pagination.page);
    }, [500]);
  }, [pagination.page]);

  useEffect(() => {
    setMessages(new Map());
    setPagination((prev) => ({ ...prev, page: 0 }));
    fetchMessages(0);
  }, [roomId]);

  useEffect(() => {
    socket?.current?.emit("joinRoom", { roomId: roomId });
  }, [socket.current, roomId]);

  //save message to db and send to the group via socket
  const sendMessageAndSave = () => {
    if (messageInput == "" || messageInput == null || messageInput == undefined)
      return;
    API.post(`/api/messages/${roomId}`, {
      text: messageInput,
    }).then((res) => {
      console.log("before sending user", res);
      socket.current?.emit("groupMessageToServer", {
        user: ourSelf,
        text: res?.data?.text,
        id: res?.data?.id,
        //TODO: need to check the error in BE
        // createdDate: res?.data?.createdDate,
        roomId: roomId,
      });
    });

    setMessageInput("");
  };

  //detect the user is typeing
  const userTypeingHandler = (e) => {
    setMessageInput(e);

    socket?.current?.emit("userStartTypingToServer", {
      user: {
        id: ourSelf?.id,
      },
      roomId: roomId,
    });

    setTimeout(() => {
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
      setMessages(
        (prevMessages) => new Map([[data.id, data], ...prevMessages])
      );
    });
  });

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="py-3 pl-5 pr-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-4xl gap-2">
              <ArrowLeftOutlined className="lg:hidden text-black cursor-pointer" />
              <img
                src={userImg}
                alt=""
                className="rounded-full min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px]"
              />
            </div>
            <div className="w-full flex items-center justify-between ml-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-700">
                  {room?.name}
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
              <div className="text-4xl">
                <EllipsisOutlined className="hover:bg-green-300 hover:cursor-pointer rounded-full border-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow p-6 overflow-y-auto relative flex flex-col-reverse">
          {Array.from(messages.values()).map((message, i) =>
            i + 1 === messages.size ? (
              <Message
                message={message}
                key={message.id}
                lastMessageRef={lastElementRef}
              />
            ) : (
              <Message message={message} key={message.id} />
            )
          )}
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
          </div>
          <div className="flex flex-grow gap-5 justify-between items-center w-full">
            <InputEmoji
              onChange={userTypeingHandler}
              value={messageInput}
              placeholder={"Aa"}
            />

            <div onClick={sendMessageAndSave}>
              <Button type={"primary"} text={"Küld"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
