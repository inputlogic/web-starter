import queryString from 'query-string'
import {reduce} from 'wasmuth'

import {API_URL} from '/settings'

const PAGE_SIZE = 25

/**
 * Define your API paths here.
 *
 * Ex:
 *   posts: 'posts',
 *   post: 'posts/:id'
 */
const API_PATHS = {

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
