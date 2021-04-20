import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import userReducer from './user/userReducer'
import errorReducer from './error/errorReducer'
import successReducer from './success/successReducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    error: errorReducer,
    success: successReducer
  })

export default createRootReducer
