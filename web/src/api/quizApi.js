import axios from 'axios'

// const postHeaders = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// }

const backendURL = process.env.REACT_APP_BACKEND_URL

const postJSONHeaders = {
  'Content-Type': 'application/json'
}

export function getAllQuizzes () {
  return axios.get(backendURL + '/api/quiz/')
}

export function createQuiz (data) {
  return axios.post(backendURL + '/api/quiz', data, postJSONHeaders)
}
