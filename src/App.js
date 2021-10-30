import React, { useState, useEffect } from 'react';
import Search from './containers/Search'
import Home from './containers/Home'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/home" exact component={Home} />
        </Switch>
    </Router>
  );
}
export default App;
