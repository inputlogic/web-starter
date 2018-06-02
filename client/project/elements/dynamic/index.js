import {request as baseRequest} from 'wasmuth'
import {dispatch, set} from '/store'
import connect from '/util/connect'
import apiUrl from '/util/apiUrl'
import request from '/util/request'

const {promise} = baseRequest({url: apiUrl('content')})
promise.then(res => {
  dispatch(set(['requests', apiUrl('content'), 'result'], W.reduce(
    (acc, c) => ({
      ...acc,
      [c.page]: {[c.identifier]: c.value, ...(acc[c.page] || {})}
    }),
    {},
    res.results
  )))
})

const cached = {}

const sentDynamicValues = {}
const postDynamicValue = (page, id, value) => {
  console.log('hi')
  if (W.path([page, id], sentDynamicValues)) {
    return
  }
  if (!sentDynamicValues[page]) {
    sentDynamicValues[page] = {[id]: true}
  } else {
    sentDynamicValues[page][id] = true
  }
  const {promise} = request({
    url: apiUrl('content'),
    method: 'POST',
    data: {page, identifier: id, value}
  })
  promise.then(res => { console.log('saved res') })
}

export const DynamicText = connect({
  withState: state => {
    const pageName = state.route.name
    return {
      content: W.path(['requests', apiUrl('content'), 'result'], state),
      pageName
    }
  }
})(({content, id, children, pageName}) => {
  const page = (content || {})[pageName]
  const value = (page || {})[id] || W.path([pageName, id], cached) || children
  if (content && (!page || !page[id])) {
    postDynamicValue(pageName, id, children[0])
  }
  return value
})

export const Dynamic = connect({
  withState: state => {
    const pageName = state.route.name
    return {
      content: W.path(['requests', apiUrl('content'), 'result'], state),
      pageName
    }
  }
})(({content, id, default: initial, children, pageName}) => {
  const func = children[0]
  if (typeof func !== 'function') {
    console.warn('Dynamic expects a function as the only child.')
  }
  const page = (content || {})[pageName]
  const value = (page || {})[id] || W.path([pageName, id], cached) || initial
  if (content && (!page || !page[id])) {
    postDynamicValue(pageName, id, initial)
  }
  return func({value})
})
