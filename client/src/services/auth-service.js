import axios from "axios";

const API_URL = 'http://localhost:3000/api/auth/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'signup',{
        username,
        email,
        password
    })
}

const login = async (username, password) => {

    let res = await axios.post(API_URL + 'signin',{username, password});
    res = await res.data;

    localStorage.setItem('user', JSON.stringify(res));
    return res;
}

const logout = () => { localStorage.removeItem('user')};

export default {
    register,
    login,
    logout
}