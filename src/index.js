import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './state/reducers'


export const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  );



ReactDOM.render(
  <Provider store={store}>
    <App  />
  </Provider>,  
  document.getElementById('root'));

registerServiceWorker();


