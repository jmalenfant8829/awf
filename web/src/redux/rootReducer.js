import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import userReducer from "./user/userReducer"

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
  });

export default createRootReducer;
