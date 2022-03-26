import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
import '../App.css'

function Home() {
    
  const [listOfPosts, setListOfPost] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) =>{
      setListOfPost(response.data)
    })
  }, [])
  
  return (
    <div>
        {listOfPosts.map((value, key) => {
        return (
        <div className="posts">
          <div className="title"> {value.title}</div>
          <div className="body"> {value.postText}</div>
          <div className="footer">@{value.username} <br/>
          {/* <div className="time"> {value.createdAt} </div>  */}
          </div>
           
        </div>
        );
      })}
    </div>
  )
}

export default Home