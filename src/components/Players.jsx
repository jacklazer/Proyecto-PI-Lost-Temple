import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { socket } from "../socket/socket-manager";

export const playersAtom = atom([])

export const Players =() => {
    const [players, setPlayers] = useAtom(playersAtom)

    // useEffect(()=>{
    socket.on('players-connected', (playersConnected)=>{
        setPlayers(playersConnected)
        // console.log(">", players);
    })
    // }, [])

}
