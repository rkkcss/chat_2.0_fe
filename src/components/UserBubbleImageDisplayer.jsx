import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import userDefault from "../assets/userDefault.jpg";

export const UserBubbleImageDisplayer = ({ participants, isOnlineBubble }) => {
  const ourSelf = useSelector((state) => state.userStore.user);
  const [randomUserImages, setRandomUserImages] = useState([]);
  const [userImgList, setUserImgList] = useState([]);

  const filterParticipantsForOnlyUsers = () => {
    const participantList = participants.map((participant) => {
      return { ...participant.user };
    });
    setUserImgList(participantList);
  };

  useLayoutEffect(() => {
    filterParticipantsForOnlyUsers();
    const imageList = userImgList.filter((user) => {
      return user.id !== ourSelf.id;
    });
    setRandomUserImages(imageList);
  }, [participants]);

  return (
    <>
      {randomUserImages.length > 1 ? (
        <div className="w-[47px] h-[52px]">
          <img
            className="min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] rounded-full absolute bottom-0 left-0 z-10"
            src={
              randomUserImages[0]?.imageUrl
                ? randomUserImages[0]?.imageUrl
                : userDefault
            }
          />
          <img
            className="min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] rounded-full absolute top-0 right-0 z-0"
            src={
              randomUserImages[1]?.imageUrl
                ? randomUserImages[1]?.imageUrl
                : userDefault
            }
          />
          {isOnlineBubble && (
            <span className="absolute bottom-0 right-0 p-1.5 bg-green-500 rounded-full"></span>
          )}
        </div>
      ) : (
        <>
          <img
            className="h-full min-w-[47px] min-h-[47px] max-w-[47px] max-h-[47px] rounded-full"
            src={
              randomUserImages[0]?.imageUrl
                ? randomUserImages[0]?.imageUrl
                : userDefault
            }
          />
          {isOnlineBubble && (
            <span className="absolute bottom-0 right-0 p-1.5 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </>
      )}
    </>
  );
};

UserBubbleImageDisplayer.propTypes = {
  participants: PropTypes.array.isRequired,
  isOnlineBubble: PropTypes.bool,
};
