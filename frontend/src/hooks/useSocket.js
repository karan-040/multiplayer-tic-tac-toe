import { useContext, useEffect, useState } from "react";
import OnlineContext from "../contexts/OnlineContext";
import { useNavigate } from "react-router-dom";

const UseSocket = () => {
  const Navigate = useNavigate();
  const {
    gameState,
    setgameState,
    Move,
    setMove,
    Winner,
    setWinner,
    socket,
    roomID,
    setError,
  } = useContext(OnlineContext);

  const setTurn = (index) => {
    if (gameState[index].valid && Move) {
      socket.emit("Move", { index, room: roomID });
    }
  };

  useEffect(() => {
    //<====================CATCHING THE VALUES FROM BACKEND========================>
    const handleMoveMade = ({ index, player: currentPlayer }) => {
      let temp = [...gameState];
      temp[index].value = currentPlayer;
      temp[index].valid = false;
      setgameState(temp);
      setMove(!Move);

      let winnerInfo = isWinner();
      if (winnerInfo) {
        socket.emit("winner", {
          winner: winnerInfo.winner,
          indices: winnerInfo.indices,
          room: roomID,
        });
      }
    };

    const handleWon = ({ won, idx }) => {
      const updval = { ...Winner };
      updval.winner = won;
      updval.indices = idx;
      setWinner(updval);
      setMove(0);
    };

    const handleOpponentDisconnected = () => {
      setError("Opponent left the game");
    };

    socket.on("moveMade", handleMoveMade);
    socket.on("won", handleWon);
    socket.on("opponentDisconnected", handleOpponentDisconnected);

    return () => {
      socket.off("moveMade", handleMoveMade);
      socket.off("won", handleWon);
      socket.off("opponentDisconnected", handleOpponentDisconnected);
    };
  }, [
    socket,
    roomID,
    gameState,
    Move,
    setgameState,
    setMove,
    Winner,
    setWinner,
  ]);

  //<=======================FUNCTION TO CHECK WINNER====================================>
  const isWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let draw = true;

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameState[a].value &&
        gameState[a].value === gameState[b].value &&
        gameState[a].value === gameState[c].value
      ) {
        return {
          winner: gameState[a].value,
          indices: [a, b, c],
        };
      }
    }

    for (const cell of gameState) {
      if (!cell.value) {
        draw = false;
        break;
      }
    }

    if (draw) {
      return { winner: "draw", indices: [] };
    }
  };

  return [setTurn];
};

export default UseSocket;
