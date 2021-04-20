import axios from 'axios'

// const postHeaders = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// }

const postJSONHeaders = {
  'Content-Type': 'application/json'
}

export function getAllQuizzes () {
  return axios.get('/api/quiz/')
}

export function createQuiz (data) {
  return axios.post('/api/quiz', data, postJSONHeaders)
}
