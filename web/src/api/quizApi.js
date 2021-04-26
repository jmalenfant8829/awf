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

export function deleteQuiz (quizId) {
  return axios.delete(backendURL + `/api/quiz/${quizId}`)
}

export function updateQuiz (quizId, data) {
  return axios.patch(backendURL + `/api/quiz/${quizId}`, data, postJSONHeaders)
}

export function submitResponse (quizId, username, data) {
  console.log(quizId, username)
  return axios.put(backendURL + `/api/quiz/${quizId}/result/${username}`, data, postJSONHeaders)
}
