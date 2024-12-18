import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { socketService } from '../services/socketService';
import { MessageSquare } from 'lucide-react';

const GameChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const { gameDetails, username } = useGameStore();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    socketService.sendMessage(username, message);
    setMessage('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5" />
        <h3 className="font-semibold">Game Chat</h3>
      </div>
      
      <div className="h-48 overflow-y-auto mb-4 space-y-2">
        {gameDetails?.gameMessages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.username === username
                ? 'bg-blue-100 dark:bg-blue-900 ml-8'
                : 'bg-gray-100 dark:bg-gray-700 mr-8'
            }`}
          >
            <p className="text-sm font-medium">{msg.username}</p>
            <p className="text-sm">{msg.msg}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default GameChat;