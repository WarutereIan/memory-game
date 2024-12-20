import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { socketService } from "../services/socketService";

const GameChat: React.FC = () => {
  const [message, setMessage] = useState("");
  const { gameDetails, username } = useGameStore();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    socketService.sendMessage(username, message);
    setMessage("");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-rose-50 rounded-full text-rose-400">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h3 className="font-serif italic text-xl">Game Chat</h3>
      </div>

      <div className="h-48 overflow-y-auto mb-4 space-y-2 scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent">
        {gameDetails?.gameMessages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.username === username ? "bg-rose-50 ml-8" : "bg-gray-50 mr-8"
            }`}
          >
            <p className="text-sm font-serif italic mb-1">{msg.username}</p>
            <p className="text-sm text-gray-600">{msg.msg}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none text-sm"
        />
        <button
          type="submit"
          className="p-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default GameChat;
