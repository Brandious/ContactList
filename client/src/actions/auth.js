import { LOGIN_SUCCESS_SAGA,LOGOUT_SAGA,REGISTER_SUCCESS_SAGA } from "./types";


export const register = (username, email, password)  => {

       return({type: REGISTER_SUCCESS_SAGA, payload: {username, email, password}});
}


export const login = (username, password) => {

    return({type: LOGIN_SUCCESS_SAGA, payload: {username, password}});
}


export const logout = ()  => {
   return({
        type: LOGOUT_SAGA
    })
}