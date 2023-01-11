import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import { history, store } from './store';
import { Provider } from 'react-redux';
const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/' component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
, root)