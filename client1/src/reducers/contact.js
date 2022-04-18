import { GET_CONTACTS, NEW_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_CONTACTS: 
            return { contacts: payload};
        case NEW_CONTACT:
            return { contacts: payload};
        case UPDATE_CONTACT: 
            return { contacts: payload};
        case DELETE_CONTACT:
            return { contacts: payload};
        default: 
            return state;
    }
}