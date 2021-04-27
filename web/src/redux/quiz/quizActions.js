export const CREATE_QUIZ = 'CREATE_QUIZ'
export const createQuiz = (data) => ({
  type: CREATE_QUIZ,
  payload: data
})

export const GET_ALL_QUIZZES = 'GET_ALL_QUIZZES'
export const getAllQuizzes = (search) => ({
  type: GET_ALL_QUIZZES,
  search: search
})

export const SET_ALL_QUIZZES = 'SET_ALL_QUIZZES'
export const setAllQuizzes = (quizzes) => ({
  type: SET_ALL_QUIZZES,
  payload: quizzes
})

export const DELETE_QUIZ = 'DELETE_QUIZ'
export const deleteQuiz = (quizId) => ({
  type: DELETE_QUIZ,
  payload: quizId
})

export const SUBMIT_RESPONSE = 'SUBMIT_RESPONSE'
export const submitResponse = (quizId, username, data) => ({
  type: SUBMIT_RESPONSE,
  quizId: quizId,
  username: username,
  payload: data
})

export const LIKE_QUIZ = 'LIKE_QUIZ'
export const likeQuiz = (quizId, userId) => ({
  type: LIKE_QUIZ,
  quizId: quizId,
  userId: userId
})

export const GET_QUIZ_SCORE = 'GET_QUIZ_SCORE'
export const getQuizScore = (quizId, username) => ({
  type: GET_QUIZ_SCORE,
  quizId: quizId,
  username: username
})

export const GET_QUIZ = 'GET_SCORE'
export const getQuiz = (quizId) => ({
  type: GET_QUIZ,
  quizId: quizId
})
