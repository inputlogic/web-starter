import W from 'wasmuth'

import logger from '/util/logger'

import contentCache from './contentCache.js'
import renderReact from './renderReact.js'
import renderFile from './renderFile.js'

const url = require('url')
const http = require('http')
const fs = require('fs')
const path = require('path')

const queryString = require('querystringify')
const uaParser = require('ua-parser-js')

global.W = W
global.log = logger

const port = process.env.PORT || 5000
const indexFile = './public/index.html'
const notSupportedFile = './public/unsupported.html'
const renderIndex = renderFile(indexFile)
const renderUnsupported = renderFile(notSupportedFile)

contentCache()

http.createServer((request, response) => {
  const ua = uaParser(request.headers['user-agent'])
  const search = url.parse(request.url).search
  const parsed = {
    ...queryString.parse(search),
    url: request.url
  }

  // Remove the query to prevent query strings from breaking request.
  // This means devs working on css don't need to reload the page
  // after changing less file.
  let filePath = './public' + request.url.split('?')[0]
  if (filePath === './public/') {
    filePath = indexFile
  }

  if (ua.browser.name === 'IE') {
    renderUnsupported(parsed, response)
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
        // No file found, render React site
        renderReact(parsed, request).then(parsed => renderIndex(parsed, response))
      } else {
        // If some other error, 500 out
        response.writeHead(500)
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n')
        response.end()
      }
    } else {
      if (filePath === indexFile) {
        // this is our React index
        renderReact(parsed, request).then(parsed => renderIndex(parsed, response))
      } else {
        // Found an exact file, render that
        response.writeHead(200, { 'Content-Type': contentType })
        response.end(content, 'utf-8')
      }
    }
  })
}).listen(port)

console.log(`Server running at http://127.0.0.1:${port}/`)
