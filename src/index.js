import React from 'react'
import {render} from 'react-dom'

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'

import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {theme} from './assets/theme';

import App from './App'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
      <MuiThemeProvider theme={theme}>
          <CssBaseline />
            <App />
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
