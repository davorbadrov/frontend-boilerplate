import axios from 'axios'
import tokenStorage from 'utility/token'

const axiosInstance = axios.create({
  timeout: 25000,
  responseType: 'json'
})

// unwrap the response data for all requests, no need to do it manually every time
axiosInstance.interceptors.response.use(function (response) {
  return response.data || response
}, function (error) {
  let cleanError = (error.response && error.response.data) || error
  handleInvalidToken(cleanError)
  return Promise.reject(cleanError)
})

// If we ever get the invalid token error handle it here by removing the token
function handleInvalidToken(error) {
  if (error.statusCode === 401 && error.message === 'Invalid token format') {
    tokenStorage.clear()
  }
}

export default axiosInstance
