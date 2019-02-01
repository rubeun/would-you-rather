import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

// init store and pass in all reducers (i.e. combineReducers which calls all reducers) & middlewares (i.e. applyMiddleware)
const store = createStore(reducer, middleware);

// Render React with Redux's provider wrapper to provide access to store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)