import axios from 'axios'
import decodeJWT from 'jwt-decode'

export function setToken (token) {
  const split = token.split(' ')

  if (split.length >= 2 && split[0] === 'JWT') {
    token = split[1]
  }

  localStorage.setItem('token', token)

  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export function destroyToken () {
  localStorage.removeItem('token')

  axios.defaults.headers.common.Authorization = undefined
}

export function getToken () {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  // Instruct axios to send this token with all requests
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  return token
}

export function decodeToken (token) {
  if (!token) {
    return false
  }

  try {
    return decodeJWT(token)
  } catch (err) {
    console.log('decodeToken err', err)
    return null
  }
}

export function tokenIsCurrent (decodedToken) {
  if (!decodedToken) {
    return false
  }

  const now = Math.round(new Date().getTime() / 1000)

  return decodedToken.exp > now
}

// function tokenIsValid (token) {
//   const decoded = decodeToken(token)

//   if (!decoded) {
//     return false
//   }

//   if (!tokenIsCurrent(decoded)) {
//     return false
//   }

//   return true
// }
