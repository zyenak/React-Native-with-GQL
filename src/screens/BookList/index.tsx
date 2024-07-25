import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../graphql/queries/book-queries';
import { styles } from './styles';

const BookListScreen: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error loading books: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.books}
        keyExtractor={(item) => item.isbn}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>ISBN: {item.isbn}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
        )}
        onRefresh={refetch}
        refreshing={loading}
      />
    </View>
  );
};

export default BookListScreen;
