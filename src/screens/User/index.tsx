import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Logout: undefined;
};

export type StackNavProp<T extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, T>;

const UserScreen: React.FC = () => {
  const navigation = useNavigation<StackNavProp<'Home'>>(); 

  const handleLogoutButtonPress = () => {
    navigation.replace('Logout'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User</Text>
      <Button title="Logout Screen" onPress={handleLogoutButtonPress} />
    </View>
  );
};

export default UserScreen;
