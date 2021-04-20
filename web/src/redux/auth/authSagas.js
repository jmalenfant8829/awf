import { all, call, put, takeLatest } from 'redux-saga/effects'
import { loginUser, registerUser } from '../../api/authApi'
import { decodeToken, setToken } from '../../utils/tokenUtils'
import { setUser } from '../user/userActions'
import { LOG_IN_USER, REGISTER_USER } from './authActions'
import { setSuccess } from '../success/successActions'
import { setError } from '../error/errorActions'

function * registerUserAsync (action) {
  try {
    const { data } = yield call(registerUser, action.payload)

    console.log(data)

    yield put(setError('register', undefined))
    yield put(setSuccess('register', 'Signed up successfully'))
  } catch (err) {
    console.log('Could not sign up user', err)

    yield put(setError('register', 'Could not sign up'))
    yield put(setSuccess('register', undefined))
  }
}

function * logInUserAsync (action) {
  try {
    const { data } = yield call(loginUser, action.payload)

    console.log(data)

    // TODO: Determine response structure and pass in proper data to the setUser call below
    yield setToken(data.token)
    const decoded = yield decodeToken(data.token)
    yield put(setUser({
      isAuthenticated: true,
      ...decoded
    }))

    yield put(setSuccess('login', 'Logged in successfully'))
    yield put(setError('login', undefined))
  } catch (err) {
    console.log('Could not log in user', err)

    yield put(setSuccess('login', undefined))
    yield put(setError('login', 'Could not log in'))
  }
}

function * watchRegisterUser () {
  yield takeLatest(REGISTER_USER, registerUserAsync)
}

function * watchLogInUser () {
  yield takeLatest(LOG_IN_USER, logInUserAsync)
}

export default function * authSagas () {
  yield all([
    call(watchRegisterUser),
    call(watchLogInUser)
  ])
}
