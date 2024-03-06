import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ], build: {
        outDir: './mms-skeleton'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./source', import.meta.url))
        }
    },
    base: './'
})
