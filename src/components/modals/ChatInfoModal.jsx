import { Modal } from "./Modal";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button } from "../Button";
import { EditOutlined } from "@ant-design/icons";
import { Input } from "../Input";
import { useLayoutEffect, useState } from "react";

export const ChatInfoModal = ({ isOpen, closeModal }) => {
  const { selectedRoom } = useSelector((state) => state.roomStore);
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
      <div className="flex justify-end mt-5 gap-3">
        <Button
          type="button"
          text={"Mégse"}
          variant="secondary"
          onClick={closeModal}
        />
        <Button type="button" text={"Mentés"} variant="primary" />
      </div>
    </Modal>
  );
};

ChatInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
