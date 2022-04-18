import React, {useState, useEffect} from 'react'

import UserService from '../services/user.service';

const Home = () => {
    const [content, setContent] = useState("");

    useEffect( () => {
      const getData = async() => {
        try{
       let res = await UserService.getPublicContent();
       res =await res.data;
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

export default Home;