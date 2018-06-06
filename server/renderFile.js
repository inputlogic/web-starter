import fs from 'fs'
import ejs from 'ejs'

export const renderFile = file => (data, response) =>
  fs.readFile(file, {encoding: 'utf8'}, (_, content) => {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(ejs.render(content, {
      prerender: '',
      prerenderHead: data.prerenderHead || '<title>Web-Starter</title>',
      state: '{}',
      ...data
    }), 'utf-8')
  })

export default renderFile
