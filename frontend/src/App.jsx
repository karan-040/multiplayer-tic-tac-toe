import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import { Outlet } from "react-router-dom";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
