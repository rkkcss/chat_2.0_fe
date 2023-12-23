import { useEffect, useState } from "react";
import userImg from "../assets/user.jpg";
import {
  CloseOutlined,
  FileImageOutlined,
  GifOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button } from "./Button";
import { API } from "../axios/API";
import { useSelector } from "react-redux";
import { TypeingDots } from "../assets/TypingDots/TypeingDots";
import { useOutletContext, useParams } from "react-router-dom";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { Message } from "./Message";
import InputEmoji from "react-input-emoji";
import usePagination from "../hooks/usePaginationHook";
import { uploadImage } from "../queries/fileUploadQueries";
import { ChatMessageSectionHeader } from "./ChatMessageSectionHeader";

export const ChatMessagesSection = () => {
  dayjs.extend(relativeTime);

  const { selectedRoom } = useSelector((state) => state.roomStore);
  const { socket } = useOutletContext();
  const [messageInput, setMessageInput] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const { roomId } = useParams();
  const [messages, setMessages] = useState(new Map());
  const ourSelf = useSelector((state) => state.userStore.user);
  const [imageMessage, setImageMessage] = useState("");

  const { pagination, setPagination, loading, lastElementRef, setLoading } =
    usePagination();

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

  const handleImageMessage = (event, files) => {
    if (files) {
      setImageMessage(files[0]);
    }
    event.target.value = null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat message section header component */}
      <ChatMessageSectionHeader />
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
            <Button type={"button"} variant={"primary"} text={"Küld"} />
          </div>
        </div>
      </div>
    </div>
  );
};
