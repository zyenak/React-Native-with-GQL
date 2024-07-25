import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../../graphql/mutations/book-mutations';
import { GET_BOOKS } from '../../graphql/queries/book-queries';
import { styles } from './styles';

const AddBookScreen: React.FC = () => {
  const [isbn, setIsbn] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleAdd = async () => {
    if (!isbn || !name || !category || !price || !quantity) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    try {
      await addBook({
        variables: {
          input: { isbn, name, category, price: parseFloat(price), quantity: parseInt(quantity, 10) },
        },
      });
      Alert.alert('Success', 'Book added successfully');
      setIsbn('');
      setName('');
      setCategory('');
      setPrice('');
      setQuantity('');
    } catch (e) {
      Alert.alert('Error', 'Failed to add book');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Book</Text>
      <TextInput
        style={styles.input}
        placeholder="ISBN"
        value={isbn}
        onChangeText={setIsbn}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Button title="Add" onPress={handleAdd} disabled={loading} />
      {error && <Text style={styles.error}>Add book error: {error.message}</Text>}
    </View>
  );
};

export default AddBookScreen;
