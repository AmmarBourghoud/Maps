import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import '../assets/styles/App.css';
import Login from './Login';
import Layout from './layout/Layout';
import Map from './Map'
import { LOGIN_PATH, LIST_PATH } from '../consts/consts'; 

function App() {
  const [token, setToken] = useState('');

  // if(!token) {
  //   return (
  //   <Router>
  //     <Switch>
  //         <Route exact path="/">
  //            <Redirect to={LIST_PATH} />
  //         </Route>
  //       <Route exact path={LIST_PATH} name="Login page" render={() => <Login setToken={setToken} />} />
  //       </Switch>
  //   </Router>  
  //   );
  // }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={LOGIN_PATH}>
             <Redirect to={LIST_PATH} />
          </Route>
          <Route exact path={LIST_PATH} name="Home page" component={Layout} />
          <Route exact path='/map' name="Home page" component={Map} />
        </Switch>
      </Router>
     </div>
  );
}

export default App;
