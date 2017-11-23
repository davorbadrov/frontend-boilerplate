import api from './axios'

export function login ({email, password}) {
  return api.post('/api/users/login', {
    email,
    password
  })
}

// @TODO send as multipart data
export function register ({name, email, password, avatar}) {
  return api.post('/api/users/register', {
    name,
    email,
    password,
    avatar
  })
}

export function get () {
  return api.get('/api/users/me')
}

const userApi = {
  login,
  register,
  get
}

export default userApi
