
import {put, takeEvery, takeLatest } from 'redux-saga/effects';
import ContactService from '../services/contact.service';
import { GET_CONTACTS_SAGA, GET_CONTACTS, NEW_CONTACT, SET_MESSAGE, DELETE_CONTACT, UPDATE_CONTACT, NEW_CONTACT_SAGA, DELETE_CONTACT_SAGA, UPDATE_CONTACT_SAGA } from "../actions/types";



export function* getContactsSaga(action)
{
    try{
       
        let res = yield ContactService.getContacts(action.data.userId);
        res = yield res.data;
        
  
        yield put({type: GET_CONTACTS, payload: res});
        yield put({type: SET_MESSAGE, payload: "SUCCESS"});

        }
        catch(err)
        {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            yield put({
                type: SET_MESSAGE,
                payload: message
            })

            
        }

}

export function* watchGetContactsSaga()
{
    yield takeLatest(GET_CONTACTS_SAGA, getContactsSaga);
}



export function* newContactSaga(action)
{
    try{

        const {name , email, number, userId} = action.data;
        const res = yield ContactService.newContact(name, email, number, userId);
        yield put({type: NEW_CONTACT, payload: {contact: res.data}});
        yield put({type: SET_MESSAGE, payload: res.data.message});
    
        
       
        }
        catch(err)
        {       
           
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    
        
            yield put({
                type: SET_MESSAGE,
                payload: message
            })
    
           
        }
}

export function* watchNewContactsSaga()
{
    yield takeLatest(NEW_CONTACT_SAGA, newContactSaga);
}

export function* deleteContactSaga(action)
{
    try{
        const {contactId} = action.data;
       
        const res = yield ContactService.deleteContact(contactId);
        console.log(contactId);
       yield put({type: DELETE_CONTACT, payload: {contact: res.data}});
       yield put({type: SET_MESSAGE, payload: res.data.message});
    
        
       
        }
        catch(err)
        {       
           
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    
        
           yield put({
                type: SET_MESSAGE,
                payload: message
            })
    
     
        }
}

export function* watchDeleteContactsSaga()
{
    yield takeLatest(DELETE_CONTACT_SAGA, deleteContactSaga);
}



export function* updateContactSaga(action) 
{
    try{
        const {contactId, name, email, number} = action.data;
        const res = yield ContactService.updateContact(contactId, name, email, number);
     
        yield put({type: UPDATE_CONTACT, payload: {contact: res.data}});
        yield put({type: SET_MESSAGE, payload: res.data.message});
    
        
        
        }
        catch(err)
        {       
           
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    
        
           yield put({
                type: SET_MESSAGE,
                payload: message
            })
    
            
        }
}

export function* watchUpdateContactsSaga()
{
    yield takeLatest(UPDATE_CONTACT_SAGA, updateContactSaga);
}

