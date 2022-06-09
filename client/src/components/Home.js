import React, { useContext } from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
import '../App.css';
import { useHistory, Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../helpers/AuthContext';

function Home() {

  const [listOfPosts, setListOfPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  const likeAPost = (PostId) => {
    axios.post("http://localhost:3001/likes", {
      PostId: PostId
    }, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }
    ).then((response) => {
      if (response.data.error) {
        alert("You are not logged in");

        console.log(response.data.error)
      }
      else {
      //  alert(response.data.message);
        setListOfPost(listOfPosts.map((val) => {
          if (val.id === PostId) {
            if (response.data.liked) {
              return { ...val, Likes: [...val.Likes, 0] };
            } else {
              const likeArray = val.Likes
              likeArray.pop()
              return { ...val, Likes: likeArray };
            }
          } else {
            return val;
          }
        }));
        if (likedPosts.includes(PostId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== PostId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, PostId]);
        }
      }
    })
  };

  // const sortPosts = setListOfPosts.sort((a, b) => {
  //   return 1*a.createdAt.localeCompare(b.createdAt);
  // });
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios.get("http://localhost:3001/posts", {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }).then((response) => {
        setListOfPost(response.data.listOfPosts).sort((a, b) =>  a.id > b.id ? 1 : -1);
        setLikedPosts(response.data.likedPosts.map((like) => {
          return like.PostId;
        })
        );
      })
    }
  }, [])

  return (
    <div>
      {listOfPosts.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1).map((value, key) => {
        return (
          <div key={key} className="posts" onDoubleClick={()=> {likeAPost(value.id)}}>

            <div className="title"> {value.title}</div>
            <div
              className="body"
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">
                <Link to= {`/profile/${value.UserId}`}>{value.username}</Link>
              </div>
              <div className="buttons">
                <FavoriteIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />
                <label>{value.Likes.length}</label>
                {/* <div className="time"> {value.createdAt} </div>  */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home