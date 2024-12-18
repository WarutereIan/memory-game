import { create } from "zustand";

interface SocketConnectedStore {
  socketConnected: boolean;
  toggleSocketConnected: (isSocketConnected: boolean) => void;
}

export const useSocketConnectedStore = create<SocketConnectedStore>((set) => ({
  socketConnected: false,
  toggleSocketConnected: (isSocketConnected: boolean) => {
    set({ socketConnected: isSocketConnected });
  },
}));
