import { all, call, put, takeLatest } from 'redux-saga/effects'
import { loginUser, registerUser } from '../../api/authApi'
import { decodeToken, setToken } from '../../utils/tokenUtils'
import { setUser } from '../user/userActions'
import { LOG_IN_USER, REGISTER_USER } from './authActions'

function * registerUserAsync (action) {
  try {
    const { data } = yield call(registerUser, action.payload)

    console.log(data)

    // TODO: Link to error and success reducers
  } catch (err) {
    console.log('Could not sign up user', err)

    // TODO: Link to error and success reducers
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

    // TODO: Link to error and success reducers
  } catch (err) {
    console.log('Could not log in user', err)

    // TODO: Link to error and success reducers
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
