const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const port = Number(process.env.PORT || 3000)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
}

const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || '/').split('?')[0])
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.slice(1)
  const filePath = path.resolve(root, relativePath)

  if (!filePath.startsWith(root + path.sep)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  fs.stat(filePath, (error, stats) => {
    const resolvedPath = !error && stats.isFile() ? filePath : path.join(root, 'index.html')

    fs.readFile(resolvedPath, (readError, content) => {
      if (readError) {
        response.writeHead(500)
        response.end('Unable to load preview')
        return
      }

      const extension = path.extname(resolvedPath).toLowerCase()
      response.writeHead(200, {
        'Cache-Control': 'no-cache',
        'Content-Type': mimeTypes[extension] || 'application/octet-stream',
      })
      response.end(content)
    })
  })
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio preview running on port ${port}`)
})
