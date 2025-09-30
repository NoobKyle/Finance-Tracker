/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,          // gives test(), expect(), describe() automatically
        environment: 'jsdom',   // simulate browser (window, localStorage, etc.)
        setupFiles: './src/setupTests.js', // runs before each test file
    },
});
