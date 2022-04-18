import React, {useEffect} from 'react'

import ContactList from './ContactList';

const BoardUser = () => {
  
    useEffect( () => {
      const getData = async() => {
        console.log('rendering')
     }

     return getData();
    }, [])
    
    return (
        <div className="container">
      
         <ContactList/>
      
      
    </div> 
    )
}

export default BoardUser;