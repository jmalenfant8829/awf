import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './rootReducer'
import rootSaga from './rootSaga'

const history = createBrowserHistory()
const rootReducer = createRootReducer(history)

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const useMiddleware = () => {
  if (process.env.NODE_ENV === 'development') {
    return compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  }

  return applyMiddleware(...middleware)
}

const store = createStore(rootReducer, useMiddleware())
sagaMiddleware.run(rootSaga)

export { store, history }
