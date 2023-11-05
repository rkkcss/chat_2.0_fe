import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function useIsAnyUserOnline(participants) {
  const [isAnyUserOnline, setIsAnyUserOnline] = useState(false);
  const { activeUsers } = useSelector((state) => state.activeUsersStore);
  const ourSelf = useSelector(state => state.userStore.user);
  
  useEffect(() => {
    const anyOnline = activeUsers?.some((user) =>
      participants?.some(
        (participant) =>
          participant.user.id == user.id && participant.user.id != ourSelf.id
      )
    );
    setIsAnyUserOnline(anyOnline);
  }, [activeUsers, participants, ourSelf]);
  return isAnyUserOnline;
}
