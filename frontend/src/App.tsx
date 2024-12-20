import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameMenu from "./components/menu/GameMenu";
import GameBoard from "./components/game/GameBoard";
import MultiplayerGame from "./components/multiplayer/MultiplayerGame";
import WaitingRoom from "./components/WaitingRoom";
import PlayerStats from "./components/stats/PlayerStats";
import Leaderboard from "./components/stats/Leaderboard";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminRoute } from "./components/admin/AdminRoute";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminAuth } from "./pages/admin/AdminAuth";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameMenu />} />
        <Route path="/singleplayer" element={<GameBoard />} />
        <Route
          path="/multiplayer"
          element={
            <ProtectedRoute>
              <WaitingRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multiplayer/game"
          element={
            <ProtectedRoute>
              <MultiplayerGame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <PlayerStats />
            </ProtectedRoute>
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
