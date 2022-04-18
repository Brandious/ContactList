import {GET_CONTACTS_SAGA, NEW_CONTACT_SAGA, UPDATE_CONTACT_SAGA, DELETE_CONTACT_SAGA } from "./types";


export const getContacts = (userId)  => {
    
    return ({type: GET_CONTACTS_SAGA, data: {userId}});
}


export const newContact = (name, email, number, userId) => {
    return ({type: NEW_CONTACT_SAGA, data: {name, email, number, userId}});
}

export const updateContact = (contactId, name, email, number) => 
{
    return ({type: UPDATE_CONTACT_SAGA, data: {contactId, name, email, number}});
}

export const deleteContact = (contactId) => 
{
    return ({type: DELETE_CONTACT_SAGA, data: {contactId}});
}


