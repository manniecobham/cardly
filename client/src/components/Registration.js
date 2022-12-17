import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function Registration() {

  const initialValues = {
    username: "",
    password: ""
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(4).max(10).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data)  => {
    axios.post("https://mannie-blog.herokuapp.com/auth", data).then((response)=>{
      if(response.data.error){
        alert(response.data.error)
      }else{
      console.log(response.data);
      }
    });
  };



  return (
    <div>
      <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                <Form className="login-box">
                   <h2>Create Username & Password</h2>
                   <div className="Form1">
                     <div className="user-box">
                    
                    <ErrorMessage name="username" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="username"
                        autocomplete="off"
                        placeholder="your username..."
                    />
                    <label>Username:</label>
                    </div>
                    <div className="user-box">
                    <ErrorMessage name="password" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="password"
                        type="password"
                        placeholder="your Password..."
                        autocomplete="off"
                    />
                    <label>Password:</label>
                    </div>
                    <button type="submit">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      Submit
                      </button>
                </div>
                </Form>
            </Formik>
    </div>
  )
}

export default Registration