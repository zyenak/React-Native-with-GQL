import "react-native-devsettings/withAsyncStorage";
import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import createApolloClient from './config/apollo-client';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import StackNavigator from './navigation/StackNavigator';

const App: React.FC = () => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const initializeClient = async () => {
      const apolloClient = await createApolloClient();
      setClient(apolloClient);
    };

    initializeClient();
    RNBootSplash.hide();
  }, []);

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
