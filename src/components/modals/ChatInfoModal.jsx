import { Modal } from "./Modal";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button } from "../Button";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Input } from "../Input";
import { useLayoutEffect, useState } from "react";
import { Tooltip } from "../Tooltip";

export const ChatInfoModal = ({ isOpen, closeModal }) => {
  const { selectedRoom } = useSelector((state) => state.roomStore);
  const { user } = useSelector((state) => state.userStore);
  const [roomName, setRoomName] = useState("");
  const [isInputReadOnly, setIsInputReadOnly] = useState(true);

  useLayoutEffect(() => {
    setRoomName(selectedRoom.name);
    !isOpen && setIsInputReadOnly(true);
  }, [selectedRoom, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title={"Szoba információk"}
      size={"md"}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center group">
          <span>Szoba neve:</span>

          <EditOutlined
            style={{ fontSize: "20px" }}
            className="invisible group-hover:visible mr-3 ml-auto cursor-pointer"
            onClick={() => setIsInputReadOnly(false)}
          />
          <div className="w-80">
            <Input
              value={roomName}
              placeholder={"Szoba neve..."}
              type={"text"}
              onChange={(e) => setRoomName(e.target.value)}
              disabled={isInputReadOnly}
            />
          </div>
        </div>
        <div>
          <span className="flex items-center gap-2 text-xl">Tagok</span>
          <div className="overflow-y-auto max-h-52">
            <ul className="">
              {selectedRoom.participants.map((participant) => {
                return (
                  user.id != participant.user.id && (
                    <li
                      key={participant.id}
                      className="flex items-center gap-3 group"
                    >
                      <img
                        src={participant.user.imageUrl}
                        alt="Profile image"
                        className="rounded-full w-8 h-8"
                      />
                      <span>
                        {participant.user.firstName +
                          " " +
                          participant.user.lastName}
                      </span>
                      <div className="ml-auto mr-0">
                        <DeleteOutlined className="group-hover:visible invisible cursor-pointer p-1 rounded-full hover:bg-gray-200 text-red-600" />
                      </div>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex justify-end mt-5 gap-3">
          <Button
            type="button"
            text={"Mégse"}
            variant="secondary"
            onClick={closeModal}
          />
          <Button type="button" text={"Mentés"} variant="primary" />
        </div>
      </div>
    </Modal>
  );
};

ChatInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
