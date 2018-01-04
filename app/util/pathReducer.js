import {
  path as pathGet,
  pathSet,
  merge,
  without,
  last
} from 'wasmuth'

import check from 'check-arg-types'

const toType = check.prototype.toType

export function pathReducer (state, action) {
  const type = action.type
  if (!type ||
    ['ATOM_SET', 'ATOM_UPDATE', 'ATOM_REMOVE'].indexOf(type) === -1) {
    return state
  }
  const payload = action.payload
  let {path} = payload

  if (toType(path) === 'string') {
    path = [path]
  }

  switch (type) {
    case 'ATOM_SET':
      return pathSet(path, payload.value, state)

    case 'ATOM_UPDATE':
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

    case 'ATOM_REMOVE':
      const parent = pathGet(path.slice(0, -1), state)
      const parentType = toType(parent)
      if (parentType === 'object') {
        return pathSet(
          path.slice(0, -1),
          without(path.slice(-1), parent),
          state
        )
      } else if (parentType === 'array') {
        const idx = last(path)
        if (toType(idx) === 'number') {
          parent.splice(idx, 1)
          return pathSet(path.slice(0, -1), parent, state)
        }
      }
      return pathSet(path, null, state)

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
  }
}
