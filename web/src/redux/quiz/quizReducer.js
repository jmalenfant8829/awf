import { DELETE_QUIZ, SET_ALL_QUIZZES } from './quizActions'

const initialState = {
  quizzes: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_QUIZZES:
      return {
        ...state,
        quizzes: action.payload
      }
    case DELETE_QUIZ:
      return deleteQuiz(state, action.payload)
    default:
      return state
  }
}

function deleteQuiz (state, quizId) {
  const filtered = state.quizzes.filter(quiz => quiz._id !== quizId)

  return {
    ...state,
    quizzes: filtered
  }
}

export default reducer
