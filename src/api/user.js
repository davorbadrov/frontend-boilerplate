import api from './axios'

export function login ({email, password}) {
  return api.post('/api/users/login', {
    email,
    password
  })
}

export function register ({name, email, password}) {
  return api.post('/api/users/register', {
    name,
    email,
    password
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
