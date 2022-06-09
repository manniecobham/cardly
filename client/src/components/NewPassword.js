import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function NewPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    axios.put('http://localhost:3001/auth/changepassword', {
    oldPassword: oldPassword, newPassword: newPassword
  },  {
    headers: {
      accessToken: localStorage.getItem("accessToken")
    }
  }).then((response) => {
    if (response.data.error) {
      alert(response.data.error);
    } else {
    console.log(response.data);
    }
  });
};
  

  return (
    <div>
      <h1>Change you Password</h1>
      <input value={oldPassword} type="password" placeholder='Old Password...' onChange={(event)=>{setOldPassword(event.target.value)}} />
      <input value={newPassword} type="password" placeholder='New Password...' onChange={(event)=>{setNewPassword(event.target.value)}}/>
      <button onClick={changePassword}>Save Changes</button>
    </div>
  )
}

export default NewPassword;