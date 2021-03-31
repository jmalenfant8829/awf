import axios from 'axios';

const postHeaders = {
	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
};

export function registerUser(data) {
    return axios.post("/api/register", data, postHeaders)
}

export function loginUser(data) {
    return axios.post("/api/login", data, postHeaders)
}