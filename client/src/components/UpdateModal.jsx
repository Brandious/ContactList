import React, {useState, useEffect} from 'react';

import { Modal, Button, InputGroup, Form, FormControl} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from '../actions/contact';
import validator from 'validator';

export default function UpdateModal(props) {

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [username, setUsername] = useState(props.contact.name);
    const [email, setEmail] = useState(props.contact.email);
    const [number, setNumber] = useState(props.contact.phoneNumber)
    const [error, setError] = useState('');

    useEffect(() => {
        setUsername(props.contact.name);
        setNumber(props.contact.phoneNumber)
        setEmail(props.contact.email);
    }, [])

    const onChangeUsername = (e) =>
    {
      const user = e.target.value;
      setUsername(user);
    }

    const onChangeEmail = (e) =>
    {
      const mail = e.target.value;
      if(validator.isEmail(mail)){
        setEmail(mail);
        setError('');
      }
      else 
        setError('Mail not formated');
    }

    const onChangeNumber = (e) =>
    {
      const num = e.target.value;
      if(validator.isMobilePhone(num, false, {strictMode: true})){
         setNumber(num);
         setError('')
      }
      else  
        setError('Phone number not formated');
    }

    const handleUpdateContact =  async () => {
        console.log("update...");
        await dispatch(updateContact(props.contact.id, username, email, number, currentUser.id));
        return props.onHide();
    }



    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <>

  <InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon2">Contact Name</InputGroup.Text>
    <FormControl
      placeholder={props.contact.name}
      aria-label="Contact name"
      aria-describedby="contact-name"
      onChange={onChangeUsername}
    />
    
  </InputGroup>

  <Form.Label htmlFor="basic-url">Contact Email</Form.Label>
  <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon3">
      contact@email.com
    </InputGroup.Text>
    <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder={props.contact.email} onChange={onChangeEmail}/>
    {error && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    </div>
                  )}
  </InputGroup>

  <Form.Label htmlFor="basic-number">Contact Number</Form.Label>
  <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon3">
    +XXXXXXXXXX
    </InputGroup.Text>
    <FormControl id="basic-number" aria-describedby="basic-addon3" placeholder={props.contact.phoneNumber} onChange={onChangeNumber}/>
    {error && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    </div>
                  )}
  </InputGroup>
  

 
</>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="outlined">Close</Button>
          <Button onClick={handleUpdateContact} variant="primary">Save</Button>
        </Modal.Footer>

      </Modal>
    );
  }