import { GET_CONTACTS, NEW_CONTACT, SET_MESSAGE, DELETE_CONTACT, UPDATE_CONTACT } from "./types";

import ContactService from '../services/contact.service';

export const getContacts = (userId) => async (dispatch) => {
    
        try{
       
        const res = await ContactService.getContacts(userId)
    
        await dispatch({type: GET_CONTACTS, payload: res.data});
        await dispatch({type: SET_MESSAGE, payload: "SUCCESS"});

        return res;
        }
        catch(err)
        {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            await dispatch({
                type: SET_MESSAGE,
                payload: message
            })

            return message;
        }
}


export const newContact = (name, email, number, userId) => async (dispatch) => {

    try{
    const res = await ContactService.newContact(name, email, number, userId);

    await dispatch({type: NEW_CONTACT, payload: {contact: res.data}});
    await dispatch({type: SET_MESSAGE, payload: res.data.message});

    
    return res.data;
    }
    catch(err)
    {       
       
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    
        await dispatch({
            type: SET_MESSAGE,
            payload: message
        })

        return message;
    }
}

export const deleteContact = (contactId) => async (dispatch) => {

    try{
       
    const res = await ContactService.deleteContact(contactId);
    console.log(contactId);
    await dispatch({type: DELETE_CONTACT, payload: {contact: res.data}});
    await dispatch({type: SET_MESSAGE, payload: res.data.message});

    
    return res.data;
    }
    catch(err)
    {       
       
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    
        await dispatch({
            type: SET_MESSAGE,
            payload: message
        })

        return message;
    }
}

export const updateContact = (contactId, name, email, number) => async (dispatch) => {

    try{
    const res = await ContactService.updateContact(contactId, name, email, number);

    await dispatch({type: UPDATE_CONTACT, payload: {contact: res.data}});
    await dispatch({type: SET_MESSAGE, payload: res.data.message});

    
    return res.data;
    }
    catch(err)
    {       
       
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

    
        await dispatch({
            type: SET_MESSAGE,
            payload: message
        })

        return message;
    }
}
