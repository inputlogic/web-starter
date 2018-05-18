import queryString from 'querystringify'

// @TODO: This does not preserve order of search parms. This may lead to
// withRequests urls not matching because:
//  `?a=1&b=2` may end up as `?b=2&a=1`
export const updateQuery = (queries) => {
  const existingParams = queryString.parse(window.location.search)
  return window.location.pathname + `?${queryString.stringify({...existingParams, ...queries})}`
}

export default updateQuery
