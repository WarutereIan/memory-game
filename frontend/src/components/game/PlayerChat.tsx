import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { GameMessage } from "../../types/socket";
import { socketService } from "../../services/socketService";
import { useGameStore } from "../../store/gameStore";

interface PlayerChatProps {
  messages: GameMessage[];
  isCurrentPlayer: boolean;
}

export const PlayerChat: React.FC<PlayerChatProps> = ({
  messages,
  isCurrentPlayer,
}) => {
  const [message, setMessage] = useState("");
  const { username } = useGameStore();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    socketService.sendMessage(username, message);
    setMessage("");
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-rose-400" />
        <h4 className="font-serif italic text-sm text-gray-600">
          Chat Messages
        </h4>
      </div>

      <div className="h-32 overflow-y-auto mb-3 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 rounded bg-rose-50 text-sm">
            <p className="text-gray-600">{msg.msg}</p>
          </div>
        ))}
      </div>

      {isCurrentPlayer && (
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-1 text-sm rounded-lg border border-rose-200 focus:border-rose-400 outline-none"
          />
          <button
            type="submit"
            className="p-1 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
