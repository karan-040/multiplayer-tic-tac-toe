import { useContext, useState } from "react";
import style from "./VSCPU.module.css";
import UserContext from "../../contexts/UserContext";
import CpuContext from "../../contexts/CpuContext";
import UseTurn from "../../hooks/useTurn";
import { useNavigate } from "react-router-dom";

const VSCPU = () => {
  const { gameState, setgameState, Move, Winner } = useContext(CpuContext);
  const Navigate = useNavigate();
  const [setTurn] = UseTurn();
  const handleClick = (event) => {
    const index = parseInt(event.target.id);
    setTurn(index);
  };
  const { user } = useContext(UserContext);
  if (user == "") {
    window.location.href = "/";
  }
  return (
    <div className={style.container}>
      <div className={style.details}>
        <span className={style.player1}>{user}</span>
        {!Winner.indices.length && Winner.winner != "draw" && (
          <span className={style.message}>
            {Move ? "Your Turn" : "CPU's Turn"}
          </span>
        )}
        {Winner.winner == "draw" && <span className={style.message}>Draw</span>}
        {Winner.indices.length && (
          <span className={style.message}>
            {Winner.winner == "O" ? "You Won" : "CPU Won"}
          </span>
        )}
        <span className={style.player2}>CPU</span>
      </div>
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
                  ? Winner.winner == "O"
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

export default VSCPU;
