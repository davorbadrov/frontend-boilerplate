import api from './api'

export function login({email, password}) {
  return api.post('/api/users/login', {
    email,
    password
  });
}

export function register({name, email, password}) {
  return api.post('/api/users/register', {
    name,
    email,
    password
  });
}

const userApi = {
  login,
  register
}

export default userApi;
