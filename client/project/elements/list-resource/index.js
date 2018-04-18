import connect from '/util/connect'
import parseResults from '/util/parseResults'

import BaseListResource from './base'

export default connect({
  withRequest: (state, props) => ({
    query: {
      url: props.url,
      parse: parseResults
    }
  }
)
})(({query: {results, isLoading}, children, ...props}) => {
  const child = children[0]
  if (!child || typeof child !== 'function') {
    throw new Error('ListResource requires a function as its only child')
  }
  return BaseListResource({
    ...props,
    child,
    isLoading,
    results
  })
})
