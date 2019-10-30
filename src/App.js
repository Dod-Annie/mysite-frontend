import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './pages/Login'
import HomePage from './pages/App/Index'
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </div>
  );
}

export default App;
