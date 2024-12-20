import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  define: {
    VITE_API_URL: JSON.stringify(
      process.env.VITE_API_URL || "VITE_API_URL_PLACEHOLDER"
    ),
    VITE_SOCKET_URL: JSON.stringify(
      process.env.VITE_SOCKET_URL || "VITE_SOCKET_URL_PLACEHOLDER"
    ),
  },
});
