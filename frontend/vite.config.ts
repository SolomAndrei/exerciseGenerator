import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        host: process.env.VITE_HOST || '0.0.0.0',
        port: Number(process.env.VITE_FRONTEND_PORT) || 3000,
    },
});
