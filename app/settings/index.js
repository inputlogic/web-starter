import {environment} from './environments'

const ENV = '__ENV__'

export const API_URL = {
  development: 'http://127.0.0.1:8000',
  staging: 'https://some-cool-app.herokuapp.com',
  production: 'https://some-cool-app-prod.herokuapp.com'
}[environment]

export const DEBUG = ENV === 'development'
