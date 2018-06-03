// `window` that won't fail server side

export const safeWindow = (path, ...args) => {
  try {
    const pieces = path.split('.')
    let previous = window
    let value
    for (let i = 0; i < pieces.length; i++) {
      value = previous[pieces[i]]
      if (typeof value === 'function' && value.bind) {
        value = value.bind(previous)
      }
      previous = value
    }
    return args.length > 0 ? value(...args) : value
  } catch (err) {
    console.warn('safeWindow error', err)
  }
}

export default safeWindow
