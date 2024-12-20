import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="fixed top-4 left-4 p-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-sm transition-colors"
      aria-label="Go to home"
    >
      <Home className="w-5 h-5 text-rose-400" />
    </button>
  );
};
