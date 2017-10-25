const tokenKey = 'MYSUPERDUPERADMINAPP'

export function save (token) {
  window.localStorage.setItem(tokenKey, token)
  return token
}

export function get () {
  const token = window.localStorage.getItem(tokenKey)
  return token || null
}

export function clear () {
  window.localStorage.removeItem(tokenKey)
}

const credentials = {
  save,
  get,
  clear
}

export default credentials
