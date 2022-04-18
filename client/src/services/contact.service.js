import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/test/";

const getContacts = (userId) => axios.get(API_URL + 'contact', {headers: authHeader(), data: JSON.stringify({userId})});

const newContact = (name, email, number, userId) => axios.post(API_URL + 'contact',{name, email, number, userId} ,{headers: authHeader()});

const deleteContact = (contactId) => axios.delete(API_URL + 'contact', {headers: authHeader(), data: {contactId}});

const updateContact = (contactId, name, email, number) => axios.patch(API_URL + 'contact',{contactId, name, email, number} ,{headers: authHeader()});

export default {
    getContacts,
    newContact,
    deleteContact,
    updateContact
}