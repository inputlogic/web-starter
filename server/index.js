const url = require('url')
const http = require('http')
const fs = require('fs')
const path = require('path')

const ejs = require('ejs')
const queryString = require('query-string')
const browserParser = require('ua-parser-js')

const port = process.env.PORT || 5000
const indexFile = './public/index.html'
const notSupportedFile = './public/unsupported.html'

const renderBrowserNotSupported = (data, response) =>
  fs.readFile(notSupportedFile, {encoding: 'utf8'}, (_, content) => {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(ejs.render(content, data), 'utf-8')
  })

const renderIndex = (data, response) =>
  fs.readFile(indexFile, {encoding: 'utf8'}, (_, content) => {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(ejs.render(content, {og: 1, ...data}), 'utf-8')
  })

http.createServer((request, response) => {
  const search = url.parse(request.url).search
  const parsed = queryString.parse(search)
  const ua = browserParser(request.headers['user-agent'])

  // Remove the query to prevent query strings from breaking request.
  // This means devs working on css don't need to reload the page
  // after changing less file.
  let filePath = './public' + request.url.split('?')[0]
  if (filePath === './public/') {
    filePath = indexFile
  }

  if (filePath === indexFile && ua.browser.name === 'IE') {
    renderBrowserNotSupported(parsed, response)
    return
  }

  const extname = String(path.extname(filePath)).toLowerCase()
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/x-font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'image/svg+xml'
  }

  const contentType = mimeTypes[extname] || 'application/octet-stream'

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        renderIndex(parsed, response)
      } else {
        response.writeHead(500)
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n')
        response.end()
      }
    } else {
      if (filePath === indexFile) {
        renderIndex(parsed, response)
      } else {
        response.writeHead(200, { 'Content-Type': contentType })
        response.end(content, 'utf-8')
      }
    }
  })
}).listen(port)

console.log(`Server running at http://127.0.0.1:${port}/`)
