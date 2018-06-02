import queryString from 'querystringify'
import {reduce} from 'wasmuth'

import {API_URL, PAGE_SIZE} from '/settings'

/**
 * Define your API paths here.
 *
 * Ex:
 *   posts: 'posts',
 *   post: 'posts/:id'
 */
const API_PATHS = {
  'content': 'content/',
  'contentsAdmin': 'admin/content/content',
  'contentAdmin': 'admin/content/content/:id'
}

export default (name, {args = {}, queries = {}, page} = {}) => {
  const path = API_PATHS[name]
  if (path === undefined) {
    throw new Error(`API url with name ${name} does not exist`)
  }

  const pathWithArgs = reduce(
    (acc, k) => acc.replace(`:${k}`, args[k]),
    path,
    Object.keys(args)
  )

  const pageSize = queries.limit || PAGE_SIZE
  const newQueries = {
    ...queries,
    limit: pageSize,
    ...!!page && {offset: (page - 1) * pageSize}
  }

  return `${API_URL}/${pathWithArgs}?${queryString.stringify(newQueries)}`
}
