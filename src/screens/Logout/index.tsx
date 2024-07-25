// src/screens/logout/index.tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LogoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LogoutScreen: React.FC = () => {
  const navigation = useNavigation<LogoutScreenNavigationProp>();

  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    };

    logout();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;
