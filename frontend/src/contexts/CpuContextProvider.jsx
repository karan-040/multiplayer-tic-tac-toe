import CpuContext from "./CpuContext";

import React, { useState } from "react";

function CpuContextProvider({ children }) {
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
  const [Winner, setWinner] = useState({ winner: "", indices: [] });
  const [gameState, setgameState] = useState(matrix);
  const [Move, setMove] = useState(true);
  return (
    <CpuContext.Provider
      value={{ gameState, setgameState, Move, setMove, Winner, setWinner }}
    >
      {children}
    </CpuContext.Provider>
  );
}

export default CpuContextProvider;
