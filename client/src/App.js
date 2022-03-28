import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Post from './components/Post';

function App() {

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home Page</Link>
          <Link to="/newpost"> Create A Post</Link>
        </div>
        <Switch>
          <div className="pageItems">
            <Route path="/" exact component={Home} />
            <Route path="/newpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
