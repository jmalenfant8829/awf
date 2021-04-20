export const SET_SUCCESS = "SET_SUCCESS";
export const setSuccess = (scope, success) => ({
  type: SET_SUCCESS,
  scope: scope,
  payload: success,
});
