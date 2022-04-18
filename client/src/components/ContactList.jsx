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
    const [temp, setTemp ] = useState();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { contacts } = useSelector(state => state.contact);
    const { message } = useSelector(state => state.message);
                        
    const dispatch = useDispatch();

    const item = useRef();


    useEffect( () => {
      const getData = () => {
            console.log('rendering');

            try{
                dispatch(getContacts(currentUser.id));
                console.log(message);
                
                }
                catch(error)
                {
                    const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
         
                setTemp(_content);
                }

     }

     return getData();
    }, [del, update, newContact, message])
    
    const handleAddNewContact = (e) => {
        e.preventDefault();
        setNewContact(true);
    }

    console.log(contacts);
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
     {contacts && contacts.length === 0 && <p>Add some contacts...</p>}
       {update && <UpdateModal
          show={update}
          onHide={() => setUpdate(false)}
          contact={contact}
        />}
      
        {newContact && <AddNewModal
          show={newContact}
          onHide={() => setNewContact(false)}
        />}
        {temp && <p>{temp}</p>}
     </div>
    
     </div>
    )
}

export default ContactList;