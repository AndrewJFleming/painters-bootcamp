import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getReduxStore, getRrfProp } from './config/firebase-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import './App.css';

import RouterManager from './layout/RouterManager/RouterManager';

function App() {
  return (
    <div className="App">
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
        <Router basename={'/painters-bootcamp'}>
          <RouterManager/>
        </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
