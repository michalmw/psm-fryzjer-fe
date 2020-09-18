import React from 'react'
import { render } from 'react-dom'
import DateFnsUtils from "@date-io/date-fns";

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/react-hooks';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './assets/theme';

import App from './App'
import rootReducer from './reducers'
import './assets/styles/styles.scss';
import ApolloClient from "apollo-client";
import { localApi } from "./enviroments/config";
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from "apollo-link-http";

const link = createHttpLink({ uri: localApi });

const store = createStore(rootReducer, applyMiddleware(thunk));
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
  })

render(
  <ApolloProvider client={ client }>
      <Provider store={ store }>
          <MuiThemeProvider theme={ theme }>
              <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                  <CssBaseline />
                  <App />
              </MuiPickersUtilsProvider>
          </MuiThemeProvider>
      </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
