import { all, call, put, takeLatest } from 'redux-saga/effects'
import { createQuiz } from '../../api/quizApi'
import { setError } from '../error/errorActions'
import { setSuccess } from '../success/successActions'
import { CREATE_QUIZ } from './quizActions'

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

function * watchCreateQuiz () {
  yield takeLatest(CREATE_QUIZ, createQuizAsync)
}

export default function * authSagas () {
  yield all([
    call(watchCreateQuiz)
  ])
}
