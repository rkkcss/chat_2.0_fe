import React, { useEffect, useState } from "react";
import userImg from "../assets/user.jpg";
import {
  CloseOutlined,
  EllipsisOutlined,
  FileImageOutlined,
  GifOutlined,
  LeftOutlined,
  SmileOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button } from "./Button";
import { API } from "../axios/API";
import { useSelector } from "react-redux";
import useIsAnyUserOnline from "../hooks/useIsAnyUserOnline";
import { TypeingDots } from "../assets/TypingDots/TypeingDots";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { Message } from "./Message";
import InputEmoji from "react-input-emoji";
import usePagination from "../hooks/usePaginationHook";
import axios from "axios";
import { uploadImage } from "../queries/fileUploadQueries";
import { UserBubbleImageDisplayer } from "./UserBubbleImageDisplayer";

export const ChatMessagesSection = () => {
  dayjs.extend(relativeTime);
  const navigate = useNavigate();

  const { room, activeUsers, socket, setSelectedRoom } = useOutletContext();
  const [messageInput, setMessageInput] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const { roomId } = useParams();
  const [messages, setMessages] = useState(new Map());
  const ourSelf = useSelector((state) => state.userStore.user);
  const [imageMessage, setImageMessage] = useState("");
  const [participantUsers, setParticipantUsers] = useState([]);

  const { pagination, setPagination, loading, lastElementRef, setLoading } =
    usePagination();

  const isAnyUserOnline = useIsAnyUserOnline(
    ourSelf,
    activeUsers,
    room?.participants
  );

  useEffect(() => {
    socket?.current.on("userStartTypingToClient", (res) => {
      if (res.roomId == roomId && ourSelf.id != res.user.id) {
        setIsUserTyping(true);
      }
    });
    socket?.current.on("userStopTypingToClient", () => {
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
    filterParticipantsForOnlyUsers();
  }, [roomId]);

  useEffect(() => {
    socket?.current.emit("joinRoom", { roomId: roomId });
  }, [socket.current, roomId]);

  //save message to db and send to the group via socket
  const sendMessageAndSave = async () => {
    if (imageMessage) {
      const imageUrl = await uploadImage(imageMessage);
      postMessage(imageUrl);
      return;
    }
    if (messageInput == "" || messageInput == null || messageInput == undefined)
      return;
    else postMessage(messageInput);
  };

  const postMessage = async (message) => {
    await API.post(`/api/messages/${roomId}`, {
      text: message,
    }).then((res) => {
      console.log("before sending user", res);
      socket?.current.emit("groupMessageToServer", {
        user: ourSelf,
        text: res?.data?.text,
        id: res?.data?.id,
        //TODO: need to check the error in BE
        // createdDate: res?.data?.createdDate,
        roomId: roomId,
      });
    });
    setImageMessage("");
    setMessageInput("");
  };

  //detect the user is typeing
  const userTypeingHandler = (e) => {
    setMessageInput(e);

    socket?.current.emit("userStartTypingToServer", {
      user: {
        id: ourSelf?.id,
      },
      roomId: roomId,
    });

    setTimeout(() => {
      socket?.current.emit("userStopTypingToServer", {
        user: {
          id: ourSelf?.id,
        },
        roomId: roomId,
      });
    }, 3000);
  };

  useEffect(() => {
    socket?.current.on("groupMessageToClient", (data) => {
      setMessages(
        (prevMessages) => new Map([[data.id, data], ...prevMessages])
      );
    });
  });

  const navigateBackToChatSelection = () => {
    setSelectedRoom({});
    navigate("/chat");
  };

  const handleImageMessage = (event, files) => {
    if (files) {
      setImageMessage(files[0]);
    }
    event.target.value = null;
  };

  const filterParticipantsForOnlyUsers = () => {
    const participantList = room.participants.map((participant) => {
      return { ...participant.user };
    });
    setParticipantUsers(participantList);
  };

  return (
    <>
      <div className="h-full flex flex-col">
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

        <div className="flex-grow p-6 overflow-y-auto relative flex flex-col-reverse gap-2">
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
            <div className="file-input-container flex items-center justify-center">
              <label htmlFor="file-input" className="icon-container">
                <FileImageOutlined className="hover:text-emerald-400 hover:cursor-pointer py-2" />
              </label>
              <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={(event) =>
                  handleImageMessage(event, event.target.files)
                }
              />
            </div>
            <VideoCameraOutlined className="hover:text-emerald-400 hover:cursor-pointer py-2" />
            <GifOutlined className="hover:text-emerald-400 hover:cursor-pointer py-2" />
          </div>
          <div className="flex flex-grow gap-5 justify-between items-center w-full">
            {imageMessage ? (
              <div className={`relative`}>
                <CloseOutlined
                  className="hover:rounded-full absolute right-[-10px] top-[-10px] bg-gray-200 p-1 rounded-full hover:bg-gray-300 hover:cursor-pointer"
                  onClick={() => setImageMessage("")}
                />
                <img
                  src={URL.createObjectURL(imageMessage)}
                  alt="asd"
                  className="w-12 h-12 rounded-md"
                />
              </div>
            ) : (
              <div className="w-full">
                <InputEmoji
                  onChange={userTypeingHandler}
                  value={messageInput}
                  placeholder={"Aa"}
                />
              </div>
            )}
            <div onClick={sendMessageAndSave}>
              <Button type={"primary"} text={"Küld"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
