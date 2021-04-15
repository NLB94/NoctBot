import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CSSReset } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger)));

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  defaultOptions: {
    query: {
      errorPolicy: 'ignore',
    }
  }
});

ReactDOM.render(
  <Router>
    <StrictMode>
      <ThemeProvider>
        <CSSReset />
        <ApolloProvider client={client}>
          <Provider store={store}>
            <App />
          </Provider>
        </ApolloProvider>
      </ThemeProvider>
    </StrictMode>
  </Router>,
  document.getElementById("root")
);
