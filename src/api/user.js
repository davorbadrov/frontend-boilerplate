import api from './axios'
import {convertJsonToFormData} from 'utility/form-data'

export function login ({email, password}) {
  return api.post('/api/users/login', {
    email,
    password
  })
}

// @TODO send as multipart data
export function register ({name, email, password, avatar}) {
  const formData = convertJsonToFormData({name, email, password, avatar})
  return api.post('/api/users/register', formData)
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
