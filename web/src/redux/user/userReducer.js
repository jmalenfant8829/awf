import { SET_USER } from "./userActions"

const initialState = {
    self: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                self: action.payload,
            }
        default:
            return state
    }
}

export default reducer