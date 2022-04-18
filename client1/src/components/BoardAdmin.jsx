// import { getDefaultNormalizer } from '@testing-library/react'
import React, {useState, useEffect} from 'react'

import UserService from '../services/user.service';

const BoardAdmin = () => {
    const [content, setContent] = useState("");

    useEffect( () => {

       const getData = async() => {
         try{
        let res = await UserService.getAdminBoard();
        res =await res.json();
        setContent(res);
        }
        catch(error)
        {
            const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
        }
      }

      return getData();
      
    }, [])

    return (
        <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div> 
    )
}

export default BoardAdmin;