import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // ── Security: Disable source maps in production ──────────────
  build: {
    sourcemap: mode === 'development',
    // Minify aggressively in production
    minify: mode === 'production' ? 'terser' : 'esbuild',
    // Terser options for production
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    } : undefined,
    // Rollup options
    rollupOptions: {
      output: {
        // Hash all output files for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    // Prevent embedding source maps in production
    cssCodeSplit: false,
    // Target modern browsers for smaller bundles
    target: 'es2020',
  },

  // ── Security: Development server configuration ──────────────
  server: {
    // Only listen on localhost in development
    host: 'localhost',
    port: 5173,
    strictPort: false,
    // CORS configuration for dev server
    cors: false,
    // Do not expose server info
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },

  // ── Security: Environment variable prefix ───────────────────
  // Only variables prefixed with VITE_ are exposed to client
  envPrefix: 'VITE_',
}))
