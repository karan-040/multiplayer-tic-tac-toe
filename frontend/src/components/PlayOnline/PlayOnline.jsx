import React, { useContext } from "react";
import Online from "../Online/Online";
import OnlineContext from "../../contexts/OnlineContext";
import Loader from "../Loader/Loader";
import UserContext from "../../contexts/UserContext";

function PlayOnline() {
  const { opponent } = useContext(OnlineContext);
  return opponent == "" ? <Loader /> : <Online />;
}

export default PlayOnline;
