import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import PopUp from './PopUp';


function Navbar() {

    const { authState, setAuthState, popUp, SetPopUp } = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        axios.get('https://mannie-blog.herokuapp.com/auth/auth', {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
                setAuthState({ ...authState, status: false });
            } else {
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
            }
        })
        // if(localStorage.getItem("accessToken")){
        //   setAuthState(true);
        // }
    }, []);


    const onPopUpp = () => {
        if (!popUp) {
            SetPopUp(true);
        } else {
            SetPopUp(false)
        }
    }


    return (
        <div className="navbar">
            <div className="links">
                {
                    !authState.status ?
                        (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/registration">Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/">Home</Link>
                                <Link to="/newpost"> Create Post</Link>
                            </>
                        )
                }
            </div>

            <div className='loggedInContainer'>
                <div className='profile'>
                    {authState.status && <AccountCircleIcon className="profile-pic" onClick={onPopUpp} /> }
                     <PopUp show={popUp} setShow={SetPopUp} />
                    {/* <p> {authState.username} </p> */}
                </div>
                 {/* <button onClick={onLogout}>Sign Out</button> */}
            </div>
        </div>
    )
}

export default Navbar