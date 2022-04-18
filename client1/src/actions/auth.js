import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";

import AuthService from '../services/auth-service';

export const register = (username, email, password) => async (dispatch) => {

        try{
        const res = await AuthService.register(username,email,password);

        await dispatch({type: REGISTER_SUCCESS});
        await dispatch({type: SET_MESSAGE, payload: res.data.message});

        return res;
        }
        catch(err)
        {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            await dispatch({
                type: REGISTER_FAIL,

            })
            await dispatch({
                type: SET_MESSAGE,
                payload: message
            })

            return message;
        }
}


export const login = (username, password) => async (dispatch) => {

    try{
    const res = await AuthService.login(username,password);

    await dispatch({type: LOGIN_SUCCESS, payload: {user: res.data}});
    await dispatch({type: SET_MESSAGE, payload: res.data.message});

    
    return res.data;
    }
    catch(err)
    {       
       
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

        await dispatch({
            type: LOGIN_FAIL,

        })
        await dispatch({
            type: SET_MESSAGE,
            payload: message
        })

        return message;
    }
}


export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT
    })
}