import { SET_ERROR } from './errorActions'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        [action.scope]: action.payload
      }
    default:
      return state
  }
}

export default reducer
