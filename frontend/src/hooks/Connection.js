import { useContext, useState } from "react";
import OnlineContext from "../contexts/OnlineContext";
import { io } from "socket.io-client";
import UserContext from "../contexts/UserContext";
import conf from "../config/conf";

function Connection() {
  const { setMove, setSocket, setPlayer, setOpponent, setroomID } =
    useContext(OnlineContext);
  const { user } = useContext(UserContext);

  //code to connect to server for online playing
  const connectToServer = () => {
    const socket = io(conf.backendURL);
    socket.on("connect", () => {
      setSocket(socket);
      socket.emit("setUsername", user);
      console.log("connected to backend");
    });
    socket.on("paired", ({ partner, turn, player, room }) => {
      setOpponent(partner);
      setMove(turn);
      setPlayer(player);
      setroomID(room);
    });
    //<==================================ERROR HANDLING===================>
    socket.on("connect_error", (err) => {
      console.log("Connection error:", err);
    });

    socket.on("connect_timeout", () => {
      console.log("Connection timeout");
    });

    socket.on("reconnect_failed", () => {
      console.log("Reconnection failed");
    });
  };
  return [connectToServer];
}

export default Connection;
