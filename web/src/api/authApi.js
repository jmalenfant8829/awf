import axios from 'axios'

const postHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}

const backendURL = process.env.REACT_APP_BACKEND_URL

export function registerUser (data) {
  return axios.post(backendURL + '/api/auth/register', data, postHeaders)
}

export function loginUser (data) {
  return axios.post(backendURL + '/api/auth/login', data, postHeaders)
}
