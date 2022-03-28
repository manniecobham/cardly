import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
import '../App.css'
import { useHistory} from "react-router-dom"

function Home() {
    
  const [listOfPosts, setListOfPost] = useState([]);
  let history = useHistory()

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) =>{
      setListOfPost(response.data)
    })
  }, [])
  
  return (
    <div>
        {listOfPosts.map((value, key) => {
        return (
        <div className="posts" onClick={() => {history.push(`/post/${value.id}`)}}>
          <div className="title"> {value.title}</div>
           <div className="body"> Read More...{/*{value.postText}*/}</div> 
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