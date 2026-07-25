import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Written on every build so the running app can detect a newer deploy (see
// src/hooks/useAutoReload.js) - iOS home-screen "web clip" apps otherwise
// keep serving a stale cached bundle indefinitely.
const buildVersion = String(Date.now())
fs.mkdirSync(path.resolve(__dirname, 'public'), { recursive: true })
fs.writeFileSync(
  path.resolve(__dirname, 'public/version.json'),
  JSON.stringify({ version: buildVersion })
)

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(buildVersion),
  },
})
