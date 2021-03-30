import axios from 'axios';

const postHeaders = {
	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
};

export function registerUser(data) {
    return axios.post("/api/auth/register", data, postHeaders)
}

export function loginUser(data) {
    return axios.post("/api/auth/login", data, postHeaders)
}