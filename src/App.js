import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './pages/account/Login'
import Regist from './pages/account/Regist'
import HomePage from './pages/App/Index'
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" render={() =>
            <Redirect to='/login'></Redirect>}>
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/regist" component={Regist} />
        </div>
      </Router>
    </div>
  );
}

export default App;
