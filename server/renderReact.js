import render from 'preact-render-to-string'
import Helmet from 'preact-helmet'

import {store} from '/store'
import {MainApp} from '/index'

const requestsFinished = requests => {
  const remaining = W.reject(req => req.result != null, Object.values(requests))
  return remaining.length === 0
}

export const renderReact = (parsed, request) => new Promise((resolve, reject) => {
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
})

export default renderReact
