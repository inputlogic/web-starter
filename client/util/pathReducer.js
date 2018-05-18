import {
  path as pathGet,
  pathSet,
  merge,
  without,
  last,
  toType
} from 'wasmuth'

const TYPES = ['ATOM_SET', 'ATOM_UPDATE', 'ATOM_REMOVE', 'ATOM_BATCH']

function _set (path, payload, state) {
  return pathSet(path, payload.value, state)
}

function _update (path, payload, state) {
  let {value} = payload
  const currentValue = pathGet(path, state)
  const newType = toType(value)

  if (newType === toType(currentValue)) {
    if (newType === 'array') {
      return pathSet(path, currentValue.concat(value), state)
    } else if (newType === 'object') {
      return pathSet(path, merge(currentValue, value), state)
    }
  }
  return pathSet(path, value, state)
}

function _remove (path, payload, state) {
  const parent = pathGet(path.slice(0, -1), state)
  const parentType = toType(parent)
  if (parentType === 'object') {
    return path.length > 1
      ? pathSet(
        path.slice(0, -1),
        without(path.slice(-1), parent),
        state
      )
      : without(path, state)
  } else if (parentType === 'array') {
    const idx = last(path)
    if (toType(idx) === 'number') {
      parent.splice(idx, 1)
      return pathSet(path.slice(0, -1), parent, state)
    }
  }
  return pathSet(path, null, state)
}

function _batch (payload, state) {
  const {actions} = payload
  if (!actions || !actions.length) {
    return state
  }
  const len = actions.length
  let newState = state
  for (let x = 0; x < len; x++) {
    newState = pathReducer(newState, actions[x])
  }
  return newState
}

export function pathReducer (state, action) {
  const type = action.type
  if (!type || TYPES.indexOf(type) === -1) {
    return state
  }
  const payload = action.payload
  let {path} = payload

  switch (type) {
    case 'ATOM_SET':
      return _set(path, payload, state)

    case 'ATOM_UPDATE':
      return _update(path, payload, state)

    case 'ATOM_REMOVE':
      return _remove(path, payload, state)

    case 'ATOM_BATCH':
      return _batch(payload, state)

    default:
      return state
  }
}

export const actions = {
  set (path, value) {
    return {type: 'ATOM_SET', payload: {path, value}}
  },

  update (path, value) {
    return {type: 'ATOM_UPDATE', payload: {path, value}}
  },

  remove (path) {
    return {type: 'ATOM_REMOVE', payload: {path}}
  },

  batch () {
    return {type: 'ATOM_BATCH', payload: {actions: [].slice.call(arguments)}}
  }
}
