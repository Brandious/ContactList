import React, {useState, useEffect} from 'react';

import { Modal, Button, InputGroup, Form, FormControl} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { newContact } from '../actions/contact';
import validator from 'validator'

export default function AddNewModal(props) {

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('')
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('adding')
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

    const handleAddContact = async () => {
        await dispatch(newContact(username, email, number, currentUser.id));
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
            Add Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <>

  <InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon2">Contact Name</InputGroup.Text>
    <FormControl
      placeholder={"Name"}
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
    <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder={"Email"} onChange={onChangeEmail}/>
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
    <FormControl id="basic-number" aria-describedby="basic-addon3" placeholder={"Number"} onChange={onChangeNumber}/>
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
          <Button onClick={handleAddContact} variant="primary">Save</Button>
        </Modal.Footer>

      </Modal>
    );
  }