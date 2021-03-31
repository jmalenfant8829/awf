import { SET_SUCCESS } from "./successActions";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUCCESS:
      return {
        ...state,
        [action.scope]: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
