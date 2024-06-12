import { useContext, useState, useEffect } from "react";
import style from "./Online.module.css";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import OnlineContext from "../../contexts/OnlineContext";
import UseSocket from "../../hooks/useSocket";
import Disconnected from "../Disconnected/Disconnected";

const Online = () => {
  const {
    gameState,
    setgameState,
    setOpponent,
    Move,
    Winner,
    opponent,
    player,
    socket,
    setroomID,
    setSocket,
    setWinner,
    setMove,
    error,
    setError,
  } = useContext(OnlineContext);

  const Navigate = useNavigate();
  const [setTurn] = UseSocket();
  const handleClick = (event) => {
    const index = parseInt(event.target.id);
    setTurn(index);
  };
  const { user } = useContext(UserContext);
  useEffect(() => {
    // Cleanup function to run on unmount
    return () => {
      let temp = [...gameState];
      for (let i = 0; i < 9; i++) {
        temp[i].value = "";
        temp[i].valid = true;
      }
      setgameState(temp);
      setOpponent("");
      setroomID("");
      setWinner({ winner: "", indices: [] });
      setMove(true);
      socket.disconnect();
      setSocket("");
      setError("");
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <div className={style.container}>
      <div className={style.details}>
        <span className={style.player1}>{user}</span>
        {!Winner.indices.length && Winner.winner != "draw" && (
          <span className={style.message}>
            {Move ? "Your Turn" : `${opponent}'s turn`}
          </span>
        )}
        {Winner.winner == "draw" && <span className={style.message}>Draw</span>}
        {Winner.indices.length && (
          <span className={style.message}>
            {Winner.winner == player ? "You Won" : `${opponent} won`}
          </span>
        )}
        <span className={style.player2}>{opponent}</span>
      </div>
      {error != "" && <Disconnected />}
      <div className={style.wrapper}>
        {gameState.map((item) => (
          <div
            className={style.box}
            key={item.id}
            id={item.id}
            onClick={handleClick}
            style={{
              cursor: !item.valid ? "not-allowed" : "pointer",
              // color: item.value === "O" ? "#f2b238" : "#30c4be",
              background: Winner.indices.length
                ? Winner.indices[0] == item.id ||
                  Winner.indices[1] == item.id ||
                  Winner.indices[2] == item.id
                  ? Winner.winner == player
                    ? "#e9b452"
                    : "#30c4be"
                  : ""
                : "",
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
      <button className={style.exit} onClick={() => Navigate("/")}>
        Exit
      </button>
    </div>
  );
};

export default Online;
