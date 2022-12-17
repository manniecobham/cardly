import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import '../App.css'
import { AuthContext } from '../helpers/AuthContext'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Post() {

    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`https://mannie-blog.herokuapp.com/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
            console.log(response.data);
        });

        axios.get(`https://mannie-blog.herokuapp.com/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);

    const addComment = () => {
        axios.post("https://mannie-blog.herokuapp.com/comments", {
            commentBody: newComment, PostId: id
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
                //console.log("Comment Added");
                const commentToAdd = { commentBody: newComment, username: response.data.username };
                setComments([...comments, commentToAdd]);
                setNewComment("")
            }
        })
    };

    const deleteComment = (id) => {
        axios.delete(`https://mannie-blog.herokuapp.com/comments/${id}`,
            {
                headers:
                {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        ).then(() => {
            setComments(comments.filter((val) => {
                return val.id !== id;
            }))
        })
    };

    const deletePost = () => {
        axios.delete(`https://mannie-blog.herokuapp.com/posts/${id}`,
            {
                headers:
                {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        ).then(() => {
            history.push("/");
            // alert("Post Deleted");
        })
    };

    const editPost = (option) => {
        if (option === "title") {
            // history.push(`/title/${id}`);
            let newTitle = prompt("Enter new title");
            axios.put(`https://mannie-blog.herokuapp.com/posts/title`, { newTitle: newTitle, id: id }, {
                headers:
                {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then((response) => {
                setPostObject({ ...postObject, title: newTitle });
            })
        } else {
            //deletePost();
            let newPost = prompt("Enter new post");
            axios.put(`https://mannie-blog.herokuapp.com/posts/body`, { newPost: newPost, id: id }, {
                headers:
                {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then((response) => {
                setPostObject({ ...postObject, postText: newPost });
            })
        }
    };

    const history = useHistory();


    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"> {postObject.title} {authState.username === postObject.username && <ModeEditIcon onClick={() => { editPost("title") }} />}</div>
                    <div className="body"> {postObject.postText} {authState.username === postObject.username && <ModeEditIcon onClick={() => { editPost("post") }} />}</div>
                    <div className="footer">
                        <div className="username">
                        @{postObject.username}
                        </div>
                        {authState.username === postObject.username &&
                            <div className="deletePost" onClick={() => { deletePost(postObject.id) }}>
                                Delete Post
                                <DeleteForeverOutlinedIcon
                                className="deleteIcon"
                                    />
                            </div>
                        }
                    </div>

                </div>
            </div>
            <div className="rightSide">
                <h3>Comments</h3> 
                <div className="addCommentContainer">
                    <input type="textarea" value={newComment} placeholder='Comment here' onChange={(event) => { setNewComment(event.target.value) }} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                
                <div className="listOfComments">
                    
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>
                                {comment.commentBody} <br />
                                @{comment.username}
                                {
                                    authState.username === comment.username &&
                                    <button onClick={() => { deleteComment(comment.id) }}> X </button>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post