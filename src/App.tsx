import React from 'react';
import './App.css';
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import RepositoryLists from './RepositoryLists';

const client = new GraphQLClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: {
      "Authorization": `Bearer ${process.env.REACT_APP_USER_TOKEN}`
    }
  }
})

function App() {
  return (
    <ClientContext.Provider value={client}>
      <header className="App-header">
        <h1>Repository Lists</h1>
      </header>
      <RepositoryLists />
    </ClientContext.Provider>
  );
}

export default App;
