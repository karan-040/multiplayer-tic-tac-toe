import { useContext, useState } from "react";
import OnlineContext from "../contexts/OnlineContext";
import { io } from "socket.io-client";
import UserContext from "../contexts/UserContext";
import conf from "../config/conf";

function Connection() {
  const {
    setMove,
    setSocket,
    setPlayer,
    setOpponent,
    setroomID,
    setError,
    error,
  } = useContext(OnlineContext);
  const { user } = useContext(UserContext);

  //code to connect to server for online playing
  const connectToServer = () => {
    const socket = io(conf.backendURL);
    socket.on("connect", () => {
      setSocket(socket);
      socket.emit("setUsername", user);
    });
    socket.on("paired", ({ partner, turn, player, room }) => {
      setOpponent(partner);
      setMove(turn);
      setPlayer(player);
      setroomID(room);
    });
    //<==================================ERROR HANDLING===================>
    socket.on("connect_error", () => {
      const err = "could not reach our servers";
      setError(err);
      socket.close();
    });

    socket.on("connect_timeout", () => {
      let err = "Connection timeout";
      setError(err);
      socket.close();
    });

    socket.on("reconnect_failed", () => {
      let err = "Reconnection failed";
      setError(err);
      socket.close();
    });
  };
  return [connectToServer];
}

export default Connection;
