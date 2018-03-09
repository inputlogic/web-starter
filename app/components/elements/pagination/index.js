import {path} from 'wasmuth'
import {route as preactRoute} from 'preact-router'

import {urlFor} from '/util/route'
import {updateQuery} from '/util/updateQuery'

import {withState} from '/store'
import {PAGE_SIZE} from '/settings'

import Base from './base'

const paginationRange = (current, numPages, delta = 1) => {
  if (numPages <= 1) return [1]

  const left = current - delta
  const right = current + delta + 1
  const range = []
  const rangeWithDots = []

  range.push(1)

  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= left && i < right && i < numPages && i > 1) {
      range.push(i)
    }
  }

  range.push(numPages)

  let count
  for (let i of range) {
    if (count) {
      if (i - count === delta - 1) {
        rangeWithDots.push(count + 1)
      } else if (i - count !== 1) {
        rangeWithDots.push(null)
      }
    }
    rangeWithDots.push(i)
    count = i
  }

  // if at first or last page, pad range so there are at least 4 options
  // if `numPages` permits it.
  if (numPages >= 4 && rangeWithDots.length === 4) {
    if (current === numPages) {
      return [
        ...rangeWithDots.slice(0, 2),
        ...[numPages - 2],
        ...rangeWithDots.slice(-2)
      ]
    } else if (current === 1) {
      return [
        ...rangeWithDots.slice(0, 2),
        ...[current + 2],
        ...rangeWithDots.slice(-2)
      ]
    }
  }

  return rangeWithDots
}

export const Pagination = withState(
  ({requests = {}, route = {}}, {url}) => ({
    request: path([url, 'result'], requests),
    route
  })
)(({pageSize = PAGE_SIZE, request = {}, route = {}, url}) => {
  const {count, next, previous} = request
  if (!count || count < pageSize) {
    return
  }

  const {args} = route
  const page = args.page ? parseInt(args.page) : 1
  const numPages = Math.ceil(count / pageSize)

  if (page > numPages) {
    preactRoute(urlFor(route.name))
    window.scrollTo(0, 0)
  }

  return Base({
    pages: paginationRange(page, numPages),
    hasNext: !!next,
    hasPrevious: !!previous,
    activePage: page,
    pageBuilder: page => updateQuery({page})
  })
})

export default Pagination
