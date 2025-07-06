import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/send-email': {
        target: 'https://ahuptdaeciudbikaymxg.supabase.co/functions/v1/send-email',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/send-email', ''),
        headers: {
          'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodXB0ZGFlY2l1ZGJpa2F5bXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MTQ1NDgsImV4cCI6MjA2NzI5MDU0OH0.S1gy2patju-2W3d9KVKVtvk9_LhMYPbMo8wneFBjGsM'}`,
        },
      },
    },
  },
});