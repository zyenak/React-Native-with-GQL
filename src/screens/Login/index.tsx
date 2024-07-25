import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_USER } from '../../graphql/mutations/user-mutations';
import { styles } from './styles';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({ variables: { username, password } });
      if (data.loginUser.token) {
        await AsyncStorage.setItem('token', data.loginUser.token);
        navigation.replace('Home');
      }
    } catch (e) {
      Alert.alert('Login Failed', `Invalid username or password`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      {error && <Text style={styles.error}>Login error: {error.message}</Text>}
    </View>
  );
};

export default LoginScreen;
