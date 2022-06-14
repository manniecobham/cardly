import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import Login from './components/Login';
import Registration from './components/Registration';
import PageNotFound from './components/PageNotFound';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './components/Profile';
import NewPassword from './components/NewPassword';
import Navbar from './components/Navbar';

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });

  const [ popUp, SetPopUp ] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', {
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

  const onPopUp = () => {
    SetPopUp(false);
  };
  
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState, popUp, SetPopUp }}>
        <Router>
          <Navbar />
          <Switch>
            <div className="pageItems" onClick={onPopUp}>
              <Route path="/" exact component={Home} />
              <Route path="/newpost" exact component={CreatePost} />
              <Route path="/post/:id" exact component={Post} />
              <Route path="/login" exact component={Login} />
              <Route path="/registration" exact component={Registration} />
              <Route path="/profile/:id" exact component={Profile} />
              <Route path="/newpassword" exact component={NewPassword} />
            </div>
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>

      <div className='Banner'>
        This is a demo project by Emmanuel Cobham.
      </div>
    </div>
  );
}

export default App;
