import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://192.168.1.9:3000',
        changeOrigin: true,
        ws: true
      }
    }
  }

});

