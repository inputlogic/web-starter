import {request as baseRequest} from 'wasmuth'
import {dispatch, set, getState} from '/store'
import connect from '/util/connect'
import apiUrl from '/util/apiUrl'
import request, {getAuthHeader} from '/util/request'
import cached from '/../public/contentCache'
import Tooltip from '/project/elements/tooltip'

export const normalize = contentResponse =>
  W.reduce(
    (acc, c) => ({
      ...acc,
      [c.page]: {[c.identifier]: c, ...(acc[c.page] || {})}
    }),
    {},
    contentResponse.results
  )

const {promise} = baseRequest({url: apiUrl('content')})
promise.then(res => {
  dispatch(set(
    ['requests', apiUrl('content'), 'result'],
    normalize(res)
  ))
})

const sentDynamicValues = {}
const postDynamicValue = (page, id, value) => {
  if (!W.path(['requests', apiUrl('me'), 'result', 'isAdmin'], getState())) {
    return
  }
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
    headers: getAuthHeader(),
    data: {page, identifier: id, value}
  })
  promise.then(res => { console.log('saved res') })
}

export const DynamicText = connect({
  withState: state => {
    const pageName = state.route.name
    return {
      editMode: W.path('route.args.editMode', state) === 'true',
      content: W.path(['requests', apiUrl('content'), 'result'], state),
      pageName
    }
  }
})(({content, id, children, pageName, editMode}) => {
  const page = (content || {})[pageName]
  const value = W.path([id, 'value'], page || {}) || W.path([pageName, id, 'value'], cached) || children
  if (content && (!page || !page[id])) {
    postDynamicValue(pageName, id, children[0])
  }
  if (editMode) {
    let url
    if (page && page[id]) {
      url = apiUrl('contentAdmin', {args: {id: page[id].id}})
    } else {
      url = apiUrl('contentsAdmin')
    }
    return (
      <a href={url} target='_blank' >
        <Tooltip
          className='inline'
          text={`${id} ${pageName}`}
          pos='right'
        >
          {value}
        </Tooltip>
      </a>
    )
  }
  return Array.isArray(value) ? value[0] : value
})

export const Dynamic = connect({
  withState: state => {
    const pageName = state.route.name
    return {
      editMode: W.path('route.args.editMode', state) === 'true',
      content: W.path(['requests', apiUrl('content'), 'result'], state),
      pageName
    }
  }
})(({content, id, default: initial, children, pageName, editMode}) => {
  const func = children[0]
  if (typeof func !== 'function') {
    console.warn('Dynamic expects a function as the only child.')
  }
  const page = (content || {})[pageName]
  const value = W.path([id, 'value'], page || {}) || W.path([pageName, id, 'value'], cached) || children
  if (content && (!page || !page[id])) {
    postDynamicValue(pageName, id, initial)
  }
  if (editMode) {
    let url
    if (page && page[id]) {
      url = apiUrl('contentAdmin', {args: {id: page[id].id}})
    } else {
      url = apiUrl('contentsAdmin')
    }
    return (
      <a href={url} target='_blank' >
        <Tooltip
          className='inline'
          text={`${id} ${pageName}`}
          pos='right'
        >
          {func({value})}
        </Tooltip>
      </a>
    )
  }
  return func({value})
})
