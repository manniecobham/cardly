import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function PopUp(props) {
    const { authState, setAuthState, setPopUp } = useContext(AuthContext);

    const closePopUp = () => {
        props.setShow(false)
    };

    const history = useHistory();

    const onLogout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
            username: "",
            id: 0,
            status: false
        });
        history.push("/login");
    };

    const profile = () => {
        history.push(`/profile/${authState.id}`);
    }

    return (props.show) ? (
        <div className="popup">
            <div className="popup-inner" >
                <ul onClick={closePopUp}>
                    <li onClick={profile}>Profile</li>
                    <li onClick={onLogout}>LogOut</li>
                </ul>
            </div>
        </div>
    ) : null;
}

export default PopUp