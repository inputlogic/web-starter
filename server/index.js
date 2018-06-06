import W from 'wasmuth'

import render from 'preact-render-to-string'
import Helmet from 'preact-helmet'

import logger from '/util/logger'
import {store} from '/store'
import routes from '/allRoutes'
import {MainApp} from '/index'

import contentCache from './contentCache.js'
import matchingRoute from './matchingRoute.js'

const url = require('url')
const http = require('http')
const fs = require('fs')
const path = require('path')

const ejs = require('ejs')
const queryString = require('querystringify')
const uaParser = require('ua-parser-js')

global.W = W
global.log = logger

const port = process.env.PORT || 5000
const indexFile = './public/index.html'
const notSupportedFile = './public/unsupported.html'

contentCache()

const requestsFinished = requests => {
  const remaining = W.reject(req => req.result != null, Object.values(requests))
  return remaining.length === 0
}

const renderReact = (parsed, request) => new Promise((resolve, reject) => {
  const routePairs = W.pipe(W.toPairs, W.map(W.last))(routes)
  const match = W.find(route => matchingRoute(request.url, route.path), routePairs)

  if (match === undefined) {
    resolve(parsed)
  } else {
    const updateParsed = (html) => {
      parsed.prerender = html
      const head = Helmet.rewind()
      parsed.prerenderHead = `
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
      `
      parsed.state = JSON.stringify(store.getState())
    }
    const html = render(<MainApp url={request.url} />)
    const requests = W.pathOr({}, 'requests', store.getState())
    if (Object.keys(requests).length) {
      const maxTime = 2000
      const delay = 100
      let count = 0
      let id = setInterval(() => {
        const finished = requestsFinished(requests)
        if (finished || count * delay >= maxTime) {
          clearInterval(id)
          if (!finished) {
            updateParsed(html)
            resolve(parsed)
          } else {
            updateParsed(render(<MainApp url={request.url} />))
            resolve(parsed)
          }
        }
        count++
      }, delay)
    } else {
      updateParsed(html)
      resolve(parsed)
    }
  }
})

const renderFile = file => (data, response) =>
  fs.readFile(file, {encoding: 'utf8'}, (_, content) => {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(ejs.render(content, {
      prerender: '',
      prerenderHead: data.prerenderHead || '<title>Web-Starter</title>',
      state: '{}',
      ...data
    }), 'utf-8')
  })

const renderIndex = renderFile(indexFile)
const renderUnsupported = renderFile(notSupportedFile)

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

  renderReact(parsed, request)
    .then(parsed => {
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
    })
}).listen(port)

console.log(`Server running at http://127.0.0.1:${port}/`)
