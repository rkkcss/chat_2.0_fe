import { useEffect, useState } from "react";

export default function useIsAnyUserOnline(ourSelf, activeUsers, participants) {
  const [isAnyUserOnline, setIsAnyUserOnline] = useState(false);
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
