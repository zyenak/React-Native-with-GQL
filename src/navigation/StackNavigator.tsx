import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import UserScreen from '../screens/User';
import TabNavigator from './TabNavigator';
import LogoutScreen from '../screens/Logout';
import { useUser } from '../context/user-context';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user } = useUser();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      {user && user.role === 'admin' ? (
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Home" component={UserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Logout" component={LogoutScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
