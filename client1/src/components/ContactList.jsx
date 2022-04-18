import React, {useState, useEffect, useRef} from 'react'

import { Card, Button } from 'react-bootstrap';
import UpdateModal from './UpdateModal';
import AddNewModal from './AddNewModal';
import { deleteContact } from '../actions/contact';
import { getContacts } from '../actions/contact';
import { useDispatch, useSelector } from 'react-redux';

const ContactList= (props) => {
    
    const [newContact, setNewContact] = useState(false);
    const [update, setUpdate] = useState(false);
    const [del, setDel] = useState(false);
    const [contact, setContact] = useState({});
    const [contacts, setContacts] = useState([]);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

   
    const item = useRef();


    useEffect( () => {
      const getData = async() => {
            console.log('rendering');

            try{
                let res = await dispatch(getContacts(currentUser.id));
                res =await res.data;
                setContacts(res);
                }
                catch(error)
                {
                    const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
         
                setContacts(_content);
                }

     }

     return getData();
    }, [del, update, newContact])
    
    const handleAddNewContact = (e) => {
        e.preventDefault();
        setNewContact(true);
    }


    const handleDelete = async (e) => {
        e.preventDefault();
        setDel(true);        
        await dispatch(deleteContact(contacts[e.target.getAttribute('data-key')].id));
        setDel(false);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        setUpdate(true);
        setContact(contacts[e.target.getAttribute('data-key')])  
    }

    return (
        <div style={{display: "flex", flexDirection: 'column'}}>
            <Button variant="dark" size="lg" onClick={handleAddNewContact}>
        Add New Contact
      </Button>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}> 
        {contacts && contacts.map((el, i) => {
            return (
            <Card key={i} ref={item} style={{width: '25%', height: 'auto', borderRadius: '25px'}}>
            <Card.Header as="h5">{el.name}</Card.Header>
            <Card.Body>
            <Card.Title>{el.email}</Card.Title>
            <Card.Text>
               {el.phoneNumber}
            </Card.Text>
            <Button variant="outlined" onClick={handleDelete} data-key={i}>Delete</Button>
            <Button variant="primary" onClick={handleUpdate} data-key={i}>Update</Button>
            </Card.Body>
        </Card>)
     })}
     {contacts.length === 0 && <p>Add some contacts...</p>}
    
       {update && <UpdateModal
          show={update}
          onHide={() => setUpdate(false)}
          contact={contact}
        />}
      
        {newContact && <AddNewModal
          show={newContact}
          onHide={() => setNewContact(false)}
        />}
        
     </div>
    
     </div>
    )
}

export default ContactList;