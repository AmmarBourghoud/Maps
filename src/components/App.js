import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import '../assets/styles/App.css';
import Login from './views/Login';
import Layout from './layout/Layout';
import { LOGIN_PATH, HOME_PATH } from '../consts/consts'; 
import routes from '../routing/routes';
import SingleData from './views/SingleData'

function App() {
  const [token, setToken] = useState('');

  if(!token) {
    return (
    <Router>
      <Switch>
          <Route exact path="/">
             <Redirect to={HOME_PATH} />
          </Route>
        <Route exact path={HOME_PATH} name="Login page" render={() => <Login setToken={setToken} />} />
        </Switch>
    </Router>  
    );
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={LOGIN_PATH}>
             <Redirect to={HOME_PATH} />
          </Route>
          <Route exact path={HOME_PATH} name="Home page" component={Layout} />
          <Route exact path={routes[0].path} name="Data page" component={SingleData} />
         </Switch>
      </Router>
     </div>
  );
}

export default App;
