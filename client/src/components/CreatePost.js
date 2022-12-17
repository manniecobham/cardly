import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {

    const { authState } = useContext(AuthContext);

    const initialValues = {
        title: "",
        postText: "",
        // username: "",
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        }
    }, []);
    let history = useHistory()

    const onSubmit = (data) => {

        axios.post("https://mannie-blog.herokuapp.com/posts", data, {headers: {accessToken: localStorage.getItem('accessToken')}}).then((response) => {
            // setListOfPost(response.data)
            history.push('/')
           // console.log("Worked!!!")
        })

    };


    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        // username: Yup.string().min(4).max(10).required()
    })

    return (
        <div className="creatPostPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title:</label>
                    <ErrorMessage name="title" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="title"
                        placeholder="Fill title..."
                    />

                    <label>Post:</label>
                    <ErrorMessage name="postText" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="postText"
                        placeholder="Write your post..."
                        x-webkit-speech 
                    />

                    {/* {<label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="username"
                        placeholder="your username..."
                    />} */}

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost