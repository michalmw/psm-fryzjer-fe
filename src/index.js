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
import ApolloClient from "apollo-boost";
import {api} from "./enviroments/config";

const store = createStore(rootReducer, applyMiddleware(thunk));
const client = new ApolloClient({
    uri: api,
    onError: (({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                switch (err.extensions.code) {
                    case 'UNAUTHENTICATED':
                        // error code is set to UNAUTHENTICATED
                        // when AuthenticationError thrown in resolver

                        // modify the operation context with a new token
                        const oldHeaders = operation.getContext().headers;
                        operation.setContext({
                            headers: {
                                ...oldHeaders,
                            },
                        });
                        // retry the request, returning the new observable
                        return forward(operation);
                }
            }
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
            // if you would also like to retry automatically on
            // network errors, we recommend that you use
            // apollo-link-retry
        }
    })
});

render(
  <ApolloProvider client={client}>
      <Provider store={ store }>
          <MuiThemeProvider theme={ theme }>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <CssBaseline />
                  <App />
              </MuiPickersUtilsProvider>
          </MuiThemeProvider>
      </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
