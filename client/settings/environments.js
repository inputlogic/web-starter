import {find, some, toType, safeWindow} from 'wasmuth'

const environments = {
  development: [
    'localhost:3333',
    'localhost:3334',
    '127.0.0.1:3333',
    'localhost:5000',
    '127.0.0.1:5000'
  ],
  staging: '<STAGING_URL_HERE>',
  production: '<PRODUCTION_URL_HERE>'
}

export const environment = (() => {
  const host = safeWindow('location.host')
  if (!host) {
    return process.env.NODE_ENV || 'development'
  }
  const current = find(
    (env) => toType(environments[env]) === 'array'
      ? some(v => v === host, environments[env])
      : environments[env] === host,
    Object.keys(environments)
  )
  if (!current) {
    throw new Error('No environment matching current url')
  }
  return current
})()
