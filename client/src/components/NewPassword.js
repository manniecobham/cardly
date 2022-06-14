import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../App.css';

function NewPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [clearFields, setClearFields] = useState("");

  const changePassword = () => {
    axios.put('http://localhost:3001/auth/changepassword', {
      oldPassword: oldPassword, newPassword: newPassword
    }, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        console.log(response.data);
        setClearFields("");
      }
    });
  };


  return (
    <div className="login-box">
      <h2>Change you Password</h2>
      <div className="Form1">
        <div className="user-box">
          <input required="" value={clearFields} type="password"  onChange={(event) => { setOldPassword(event.target.value) }} />
        <label>Old Password</label>
        </div>
        <div className="user-box">
          <input required="" value={clearFields} type="password"  onChange={(event) => { setNewPassword(event.target.value) }} />
          <label>New Password</label>
        </div>
        <button onClick={changePassword}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default NewPassword;