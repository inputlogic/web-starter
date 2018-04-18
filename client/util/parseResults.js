import {path} from 'wasmuth'

export default function parseResults (res) {
  const results = path('result.results', res)
  return {results, isLoading: results == null}
}
