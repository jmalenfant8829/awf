import { all, call, put, takeLatest } from 'redux-saga/effects'
import { createQuiz, deleteQuiz, getAllQuizzes } from '../../api/quizApi'
import { setError } from '../error/errorActions'
import { setSuccess } from '../success/successActions'
import { CREATE_QUIZ, DELETE_QUIZ, GET_ALL_QUIZZES, setAllQuizzes } from './quizActions'

function * createQuizAsync (action) {
  try {
    yield call(createQuiz, action.payload)

    yield put(setSuccess('createquiz', 'Quiz created'))
    yield put(setError('createquiz', undefined))
  } catch (err) {
    console.log('Could not create quiz', err)

    yield put(setSuccess('createquiz', undefined))
    yield put(setError('createquiz', 'Could not create quiz'))
  }
}

function * getAllQuizzesAsync (action) {
  try {
    const { data } = yield call(getAllQuizzes)

    yield put(setAllQuizzes(data))
  } catch (err) {
    console.log('Could not get all quizzes', err)
  }
}

function * deleteQuizAsync (action) {
  try {
    yield call(deleteQuiz, action.payload)
  } catch (err) {
    console.log('Could not delete quiz', err)
  }
}

function * watchCreateQuiz () {
  yield takeLatest(CREATE_QUIZ, createQuizAsync)
}

function * watchGetAllQuizzes () {
  yield takeLatest(GET_ALL_QUIZZES, getAllQuizzesAsync)
}

function * watchDeleteQuiz () {
  yield takeLatest(DELETE_QUIZ, deleteQuizAsync)
}

export default function * quizSagas () {
  yield all([
    call(watchCreateQuiz),
    call(watchGetAllQuizzes),
    call(watchDeleteQuiz)
  ])
}
