import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Chat } from "./pages/Chat";
import { TicTocToe } from "./pages/TicTocToe";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { ChatMessagesSection } from "./components/ChatMessageSection";
import { Settings } from "./pages/Settings";
import { Logout } from "./pages/Logout";
import { Registration } from "./pages/Registration";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const { theme } = useSelector((state) => state.userStore);
  console.log("TÉMA", theme);

  return (
    <div className={theme}>
      <div className="dark:bg-slate-900/80">
        <Routes>
          <Route
            element={
              <ProtectedRoutes allowedroles={["ROLE_ADMIN", "ROLE_USER"]} />
            }
          >
            <Route path="/" element={<LandingPage />}>
              <Route path="chat" element={<Chat />}>
                <Route path=":roomId" element={<ChatMessagesSection />} />
              </Route>
              <Route path="settings" element={<Settings />} />
              <Route path="game" element={<TicTocToe />} />
            </Route>
            <Route path="logout" element={<Logout />}></Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
