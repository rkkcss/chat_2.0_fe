import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useHandleRoomName (roomName, participants) {
    const [finalRoomName, setFinalRoomName] = useState("");
    const { user } = useSelector(state => state.userStore)

    useLayoutEffect(() => {
        if (roomName == '' || roomName == undefined || roomName == null) {
            const listWithoutme = participants.filter(participant => participant.user.id !== user.id);
            if (listWithoutme.length > 1) {
                setFinalRoomName(() => {
                    return listWithoutme[0].user.firstName + " " + listWithoutme[0].user.lastName + ", " + listWithoutme[1].user.firstName + " " + listWithoutme[1].user.lastName
                });
            }else {
                setFinalRoomName(listWithoutme[0].user.firstName + " " + listWithoutme[0].user.lastName)
            } 
        }else {
            setFinalRoomName(roomName);
        }
    },[participants])
    return finalRoomName;
}