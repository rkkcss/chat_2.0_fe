import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useHandleRoomName (roomName, participants) {
    const [finalRoomName, setFinalRoomName] = useState("");
    const { user } = useSelector(state => state.userStore)

    useEffect(() => {
        if (roomName == '' || roomName == undefined || roomName == null) {
            const listWithoutme = participants.filter(participant => participant.user.id !== user.id);
            if (listWithoutme.length > 1) {
                listWithoutme.map((participant, index) => {
                    if (index < 1) {
                        setFinalRoomName(prev => {
                            return prev + " " + participant.user.firstName + " " +participant.user.lastName
                        })
                    }
                })   
            }else {
                setFinalRoomName(listWithoutme[0].user.firstName + " " + listWithoutme[0].user.lastName)
            } 
        }else {
            setFinalRoomName(roomName);
        }
    },[])
    return finalRoomName;
}