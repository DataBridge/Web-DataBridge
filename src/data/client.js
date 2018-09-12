import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

// const hubAddress = process.env.DATABRIDGE_HUB_GRAPHQL || 'http://localhost:9090/graphql';
const hubAddress = process.env.DATABRIDGE_HUB_GRAPHQL || 'https://db.vlynt.com/graphql';

const httpLink = createHttpLink({
  uri: hubAddress,
  credentials: 'same-origin', // eg. or credentials: 'omit', etc
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
