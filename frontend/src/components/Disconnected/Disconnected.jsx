import React, { useContext, useEffect } from "react";
import style from "./Disconnected.module.css";
import OnlineContext from "../../contexts/OnlineContext";
import { useNavigate } from "react-router-dom";

function Disconnected() {
  const { error, setError, socket } = useContext(OnlineContext);
  const Navigate = useNavigate();
  useEffect(() => {
    return () => {
      setError("");
    };
  }, []);
  return (
    <div id={style.container}>
      <div id={style.errorbox}>
        <div className={style.face2}>
          <div className={style.eye}></div>
          <div className={`${style.eye} ${style.right}`}></div>
          <div className={`${style.mouth} ${style.sad}`}></div>
        </div>
        <div className={`${style.shadow} ${style.move}`}></div>
        <div className={style.message}>
          <h1 className={style.alert}>Error!</h1>
          <p>{error}</p>
        </div>
        <button className={style.buttonbox} onClick={() => Navigate("/")}>
          <h1 className={style.red}>try again</h1>
        </button>
      </div>
    </div>
  );
}

export default Disconnected;
