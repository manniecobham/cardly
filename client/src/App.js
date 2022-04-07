import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import Login from './components/Login';
import Registration from './components/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });

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
  const onLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ ...authState, status: false });
  }



  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home Page</Link>
            <Link to="/newpost"> Create A Post</Link>

            {
              //!localStorage.getItem('accessToken')
              !authState ?
                (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Register</Link>
                  </>
                ) : (
                  <>
                    <button onClick={onLogout}
                    >Sign Out</button>
                  </>
                )
            }
            <h1> {authState.username} </h1>
          </div>
          <Switch>
            <div className="pageItems">
              <Route path="/" exact component={Home} />
              <Route path="/newpost" exact component={CreatePost} />
              <Route path="/post/:id" exact component={Post} />
              <Route path="/login" exact component={Login} />
              <Route path="/registration" exact component={Registration} />
            </div>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
