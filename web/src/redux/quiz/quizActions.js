export const CREATE_QUIZ = 'CREATE_QUIZ'
export const createQuiz = (data) => ({
  type: CREATE_QUIZ,
  payload: data
})

export const GET_ALL_QUIZZES = 'GET_ALL_QUIZZES'
export const getAllQuizzes = () => ({
  type: GET_ALL_QUIZZES
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
export const submitResponse = (quizId, data) => ({
  type: SUBMIT_RESPONSE,
  quizId: quizId,
  payload: data
})
