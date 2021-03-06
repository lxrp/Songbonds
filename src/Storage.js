export function getFromStorage(key) {
  if (!key) {
    return null
  }
  try {
    const valueStr = localStorage.getItem(key)
    if (valueStr) {
      try {
        return JSON.parse(valueStr)
      } catch (error) {}
    }
    return null
  } catch (err) {
    return null
  }
}
export function setInStorage(key, obj) {
  key || console.error('Error: Key is missing')

  try {
    localStorage.setItem(key, JSON.stringify(obj))
  } catch (err) {
    console.error(err)
  }
}
export function deleteFromStorage(key) {
  if (!key) {
    console.error('Error: Key is missing')
  }
  try {
    localStorage.removeItem(key)
  } catch (err) {
    console.error(err)
  }
}
