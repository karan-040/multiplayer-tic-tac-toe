import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./contexts/UserContextProvider.jsx";
import CpuContextProvider from "./contexts/CpuContextProvider.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import VSCPU from "./components/VSCPU/VSCPU.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import Online from "./components/Online/Online.jsx";
import OnlineContextProvider from "./contexts/OnlineContextProvider.jsx";
import PlayOnline from "./components/PlayOnline/PlayOnline.jsx";
import UserContext from "./contexts/UserContext.js";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/" />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <OnlineContextProvider>
            <Homepage />
          </OnlineContextProvider>
        ),
      },
      {
        path: "vscpu",
        element: (
          <CpuContextProvider>
            <VSCPU />
          </CpuContextProvider>
        ),
      },
      {
        path: "online",
        element: (
          <OnlineContextProvider>
            <ProtectedRoute>
              <PlayOnline />
            </ProtectedRoute>
          </OnlineContextProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
);
