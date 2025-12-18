import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // For Vercel, use root path. For custom domain with subpath, change to '/dehn/'
  base: '/',
  optimizeDeps: {
    include: ['html2canvas', 'jspdf']
  },
  build: {
    commonjsOptions: {
      include: [/html2canvas/, /jspdf/, /node_modules/]
    }
  }
}))

