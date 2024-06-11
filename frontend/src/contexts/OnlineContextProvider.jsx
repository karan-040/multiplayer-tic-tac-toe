import OnlineContext from "./OnlineContext";

import React, { useState } from "react";

const matrix = [
  { id: "0", value: "", valid: true },
  { id: "1", value: "", valid: true },
  { id: "2", value: "", valid: true },
  { id: "3", value: "", valid: true },
  { id: "4", value: "", valid: true },
  { id: "5", value: "", valid: true },
  { id: "6", value: "", valid: true },
  { id: "7", value: "", valid: true },
  { id: "8", value: "", valid: true },
];
function OnlineContextProvider({ children }) {
  const [Winner, setWinner] = useState({ winner: "", indices: [] });
  const [gameState, setgameState] = useState(matrix);
  const [Move, setMove] = useState(true);
  const [socket, setSocket] = useState();
  const [opponent, setOpponent] = useState("");
  const [player, setPlayer] = useState();
  const [roomID, setroomID] = useState();
  return (
    <OnlineContext.Provider
      value={{
        gameState,
        setgameState,
        Move,
        setMove,
        Winner,
        setWinner,
        opponent,
        setOpponent,
        setSocket,
        socket,
        player,
        setPlayer,
        roomID,
        setroomID,
      }}
    >
      {children}
    </OnlineContext.Provider>
  );
}
export default OnlineContextProvider;
