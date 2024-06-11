import { useContext, useEffect, useState } from "react";
import style from "./Homepage.module.css";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Connection from "../../hooks/Connection";

const Homepage = () => {
  const { user, setUser } = useContext(UserContext);
  const Navigate = useNavigate();
  const [connectToServer] = Connection();
  const handleClick = (e) => {
    if (user !== "") {
      if (e.target.id == "cpu") {
        Navigate("/vscpu");
      }
      if (e.target.id == "online") {
        connectToServer();
        Navigate("/online");
      }
    } else {
      alert("enter username");
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <center className={style.Heading}>
          <span style={{ color: "#F3B237" }}>O </span>
          <span style={{ color: "#31C4BE" }}>X</span>
        </center>
        <div className={style.Username}>
          <h2>Enter Username</h2>

          <input
            type="text"
            placeholder="Enter Any name you want"
            maxLength={"8"}
            onChange={(e) => setUser(e.target.value)}
            autoFocus
          />
        </div>
        <div className={style.buttons}>
          <button
            className={style.but1}
            id="cpu"
            onClick={(e) => handleClick(e)}
          >
            New Game(VS CPU)
          </button>
          <button
            className={style.but2}
            id="online"
            onClick={(e) => handleClick(e)}
          >
            New Game(VS Player)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
