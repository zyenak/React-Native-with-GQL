import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { API_URL, WS_URL } from '@env'; // Import the environment variables

const createApolloClient = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log("Token: ", token);
  console.log(API_URL)

  // HTTP connection to the API
  const httpLink = createHttpLink({
    uri: API_URL,
  });

  // WebSocket link to handle subscriptions
  const wsLink = new GraphQLWsLink(createClient({
    url: WS_URL, 
    connectionParams: {
      authentication: token,
    },
  }));

  // Authentication link to set the headers
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // Split links, directing subscription operations to the wsLink and other operations to the httpLink
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  // Apollo Client setup
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
