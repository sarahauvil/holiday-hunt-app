import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves from https://<user>.github.io/holiday-hunt-app/
const base = process.env.GITHUB_PAGES === 'true' ? '/holiday-hunt-app/' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
