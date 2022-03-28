import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory} from "react-router-dom";

function CreatePost() {

    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };

    const history = useHistory()

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            // setListOfPost(response.data)
            history.push('/')
            console.log("Worked!!!")
        })
        
    };
    

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(4).max(10).required()
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
                    />

                    <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="username"
                        placeholder="your username..."
                    />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost