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

function App() {
  return (
    <>
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
      </Routes>
    </>
  );
}

export default App;
