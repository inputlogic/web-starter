import {DEBUG} from '/settings'

const methodMap = {
  critical: 'error',
  error: 'error',
  warning: 'warn',
  info: 'info',
  debug: 'log'
}

const logger = method => (...args) => {
  if (DEBUG) {
    console[methodMap[method]].apply(console, args)
  }
  if (['critical', 'error'].includes(method)) {
    Rollbar[method].apply(Rollbar, args)
  }
}

export default {
  critical: (...args) => logger('critical')(...args),
  error: (...args) => logger('error')(...args),
  warning: (...args) => logger('warning')(...args),
  info: (...args) => logger('info')(...args),
  debug: (...args) => logger('debug')(...args)
}
