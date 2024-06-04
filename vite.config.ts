import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        eslint({
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['node_modules', 'dist', 'build'],
            eslintPath: 'eslint',
        }),
    ],
    define: {
        'process.env': loadEnv('', process.cwd()),
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
});
