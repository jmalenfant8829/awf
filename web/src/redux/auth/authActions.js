
export const REGISTER_USER = 'REGISTER_USER'
export const registerUser = (credentials) => ({
    type: REGISTER_USER,
    payload: credentials,
})

export const LOG_IN_USER = 'LOG_IN_USER'
export const logInuser = (credentials) => ({
    type: LOG_IN_USER,
    payload: credentials
})