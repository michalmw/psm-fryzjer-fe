import React from 'react'
import { render } from 'react-dom'
import DateFnsUtils from "@date-io/date-fns";

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './assets/theme';

import App from './App'
import rootReducer from './reducers'
import './assets/styles/styles.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <Provider store={ store }>
      <MuiThemeProvider theme={ theme }>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <CssBaseline />
                    <App />
          </MuiPickersUtilsProvider>
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
