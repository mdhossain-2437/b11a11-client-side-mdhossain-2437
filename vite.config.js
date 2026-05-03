import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-router')) return 'vendor-react'
          if (id.includes('react-dom') || id.match(/[\\/]react[\\/]/)) return 'vendor-react'
          if (id.includes('firebase')) return 'vendor-firebase'
          if (id.includes('gsap') || id.includes('lenis')) return 'vendor-gsap'
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts'
          if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons'
          if (id.includes('@tanstack')) return 'vendor-query'
          if (id.includes('react-hook-form')) return 'vendor-forms'
          return 'vendor'
        },
      },
    },
  },
})
