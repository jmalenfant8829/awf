import { all, call } from 'redux-saga/effects'

import authSagas from './auth/authSagas'
import quizSagas from './quiz/quizSagas'

export default function * rootSaga () {
  yield all([call(authSagas), call(quizSagas)])
}
