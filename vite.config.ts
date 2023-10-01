import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     unfetch: path.resolve(__dirname, "node_modules/unfetch/dist/unfetch.mjs"),
  //   },
  // },
  resolve: {
    alias: {
      "@style": path.resolve(__dirname, "./src/style"),
      unfetch: path.resolve(__dirname, "node_modules/unfetch/dist/unfetch.mjs"),
    },
  },
});
