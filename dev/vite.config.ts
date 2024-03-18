import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

import { beaver } from '@multivisio/nswow/scripts/beaver.mjs'
import { map } from '@multivisio/nswow/scripts/build.mjs'
import {nswowWatcher} from "@multivisio/nswow/scripts/vite.mjs"
import { alias } from "./alias.js"

await beaver()
await map()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    nswowWatcher()
  ],
  build: {
    outDir: './.output/app'
  },
  resolve: {
    alias: alias
  }
})
