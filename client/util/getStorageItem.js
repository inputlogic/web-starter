export const getStorageItem = key => {
  try {
    return window.localStorage.getItem('token')
  } catch (_) {
    return null
  }
}

export default getStorageItem
