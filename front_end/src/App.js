import React from 'react';
import ReactDOM from 'react-dom';
// import routes
import Pages from '/pages';
import GlobalStyle from './components/GlobalStyle';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// configure our API URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// configure Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true
 });
 

const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
      <GlobalStyle/>
      <Pages />
      </ApolloProvider>

    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
