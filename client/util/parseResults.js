import check from 'check-arg-types'
import {path} from 'wasmuth'

const toType = check.prototype.toType

export default function parseResults (res) {
  const result = path('result', res)
  let results
  if (toType(result) === 'object') {
    results = path('result.results', res)
  } else if (toType(result) === 'array') {
    results = result
  }
  return {results, isLoading: results == null}
}
