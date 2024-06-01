import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   headers: {
  //     'Cache-Control': 'max-age=31536000', // Cache images for 1 year
  //   },
  // },

})
