#!/usr/bin/env node
// Minimal static server for the production build, used by Playwright's webServer.
// Avoids adding a runtime dependency just to serve build/ during e2e tests.
const fs = require('fs')
const http = require('http')
const path = require('path')

const BUILD_DIR = path.join(__dirname, '..', 'build')
const PORT = Number(process.env.E2E_PORT || 4174)

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
}

if (!fs.existsSync(path.join(BUILD_DIR, 'index.html'))) {
  console.error('build/index.html not found. Run `npm run build` before the e2e tests.')
  process.exit(1)
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  let filePath = path.normalize(path.join(BUILD_DIR, urlPath))

  if (!filePath.startsWith(BUILD_DIR)) {
    res.writeHead(403).end()
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html')
  }

  if (!fs.existsSync(filePath)) {
    // Mimic GitHub Pages: unknown paths are served 404.html with a 404 status.
    const fallback = path.join(BUILD_DIR, '404.html')
    if (fs.existsSync(fallback)) {
      res.writeHead(404, { 'Content-Type': CONTENT_TYPES['.html'] })
      fs.createReadStream(fallback).pipe(res)
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found')
    }
    return
  }

  const type = CONTENT_TYPES[path.extname(filePath).toLowerCase()]
  res.writeHead(200, { 'Content-Type': type || 'application/octet-stream' })
  fs.createReadStream(filePath).pipe(res)
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Serving build/ at http://127.0.0.1:${PORT}`)
})
