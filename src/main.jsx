import { StrictMode,createContext,useState,useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
export const Admincontext = createContext({ isAuthenticated: false });
const Appwraper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  return (
    <Admincontext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <App />
    </Admincontext.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Appwraper />
  </StrictMode>
);
