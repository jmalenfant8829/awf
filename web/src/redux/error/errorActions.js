export const SET_ERROR = "SET_ERROR";
export const setError = (scope, error) => ({
  type: SET_ERROR,
  scope: scope,
  payload: error,
});
