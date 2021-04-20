import axios from 'axios'

const postHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}

export function getAllQuizzes () {
  return axios.get('/api/quiz/')
}

export function createQuiz (data) {
  return axios.post('/api/quiz', data, postHeaders)
}
