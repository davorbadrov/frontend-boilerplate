import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 25000,
  responseType: 'json'
})

// unwrap the response data for all requests, no need to do it manually every time
axiosInstance.interceptors.response.use(function (response) {
  return response.data || response
}, function (error) {
  let cleanError = (error.response && error.response.data) || error
  return Promise.reject(cleanError)
})

export default axiosInstance
