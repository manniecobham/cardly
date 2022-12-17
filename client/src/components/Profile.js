import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import NewPassword from './NewPassword';

function Profile() {
    let { id } = useParams();
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`https://mannie-blog.herokuapp.com/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username);
           // console.log(response.data);
        });
        axios.get(`https://mannie-blog.herokuapp.com/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data);
          //  console.log(response.data);
        });
    }, []);

    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>Username: {username} </h1>
                {authState.username === username && <Link to={"/NewPassword"}> Change Password</Link>}
                <div className="listOfPosts">
                    {listOfPosts.map((value, key) => {
                        return (
                            <div key={key} className="posts">

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
                                    <div className="username">{value.username}</div>
                                    
                                    <div className="buttons">
                                        <label>{value.Likes.length}</label>
                                        {/* <div className="time"> {value.createdAt} </div>  */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default Profile