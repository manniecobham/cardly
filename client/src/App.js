import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
 import CreatePost from './components/CreatePost';

function App() {

  return (
    <div className="App">
      <Router>
      <Link to="/">Home Page</Link>
        <Link to="/newpost"> Create A Post</Link>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/newpost" exact component={CreatePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
