import W from 'wasmuth'
import render from 'preact-render-to-string'

import Helmet from 'preact-helmet'

import routes from '/routes'

const url = require('url')
const http = require('http')
const fs = require('fs')
const path = require('path')

const ejs = require('ejs')
const queryString = require('query-string')
const uaParser = require('ua-parser-js')

const port = process.env.PORT || 5000
const indexFile = './public/index.html'
const notSupportedFile = './public/unsupported.html'

const renderFile = file => (data, response) =>
  fs.readFile(file, {encoding: 'utf8'}, (_, content) => {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(ejs.render(content, {
      prerenderHead: data.prerenderHead || '<title>Web-Starter</title>',
      ...data
    }), 'utf-8')
  })

const renderIndex = renderFile(indexFile)
const renderUnsupported = renderFile(notSupportedFile)

global.W = W

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

  const routePairs = W.pipe(
    W.toPairs,
    W.map(W.last)
  )(routes)
  const match = W.find(W.where('path', request.url), routePairs)
  if (match !== undefined) {
    const html = render(match.component({}))
    parsed.prerender = html
    const head = Helmet.rewind()
    parsed.prerenderHead = `
      ${head.title.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
    `
  }

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
