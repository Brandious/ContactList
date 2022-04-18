
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

import AuthService from '../services/auth-service';
import { REGISTER_SUCCESS_SAGA,REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE, LOGIN_SUCCESS_SAGA, LOGOUT_SAGA } from "../actions/types";


export function* registerSaga(action)
{
    try{
        const { payload } = action;
        const res = yield AuthService.register(payload.username,payload.email,payload.password);

        yield put({type: REGISTER_SUCCESS});
        yield put({type: SET_MESSAGE, payload: res.data.message});

        }
        catch(err)
        {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            yield put({
                type: REGISTER_FAIL,

            })
            yield put({
                type: SET_MESSAGE,
                payload: message
            })
        }
} 

export function* watchRegisterSaga() 
{
    yield takeEvery(REGISTER_SUCCESS_SAGA, registerSaga);
}


export function* loginSaga(action)
{
    try{

        const { payload } = action
        let res = yield AuthService.login(payload.username, payload.password);   
        res = yield res.data;   
           
        yield put({type: LOGIN_SUCCESS, payload: {user: res}});
        yield put({type: SET_MESSAGE, payload: res.data.message});
    
        }
    catch(err)
    {       
        
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

        yield put({
            type: LOGIN_FAIL,

        })
        yield put({
            type: SET_MESSAGE,
            payload: message
        })
    }
}

export function* watchLoginSaga() 
{
    yield takeEvery(LOGIN_SUCCESS_SAGA, loginSaga);
}




export function* logoutSaga() {
    yield AuthService.logout();
    yield put({
        type: LOGOUT
    })
}
export function* watchLogoutSaga() 
{
    yield takeLatest(LOGOUT_SAGA, logoutSaga);
}

