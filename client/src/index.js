import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import Edit from './components/EditNote';
import Create from './components/CreateNote';
import Show from './components/ShowNotes';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
      </div>
  </Router>,
  document.getElementById('root')
);
