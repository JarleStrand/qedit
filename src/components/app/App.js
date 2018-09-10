import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom'

import './App.css';
import Gateway from '../gateway/gateway.container'



const App = (store) => {
  return(
  <Router>
    <Gateway />
  </Router>
  );
}


export default App;
