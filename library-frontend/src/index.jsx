import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' 
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const isolatedStateCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allBooks: {
          merge(_existing, incoming) {
            return incoming
          }
        },
        allAuthors: {
          merge(_existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const coordinatedApolloClientInstance = new ApolloClient({
  uri: 'http://localhost:4000', 
  cache: isolatedStateCache,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={coordinatedApolloClientInstance}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)