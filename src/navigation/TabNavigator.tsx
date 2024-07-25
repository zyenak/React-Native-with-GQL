import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import BooksListScreen from '../screens/BookList';
import AddBooksScreen from '../screens/AddBook';
import LogoutScreen from '../screens/Logout';
import addbookIcon from '../assets/addbook.png';
import booklistIcon from '../assets/booklist.png';
import logoutIcon from '../assets/logout.png';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="BooksList"
      component={BooksListScreen}
      options={{
        title: 'Book List',
        tabBarIcon: () => (
          <Image
            source={booklistIcon}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="AddBook"
      component={AddBooksScreen}
      options={{
        title: 'Add Book',
        tabBarIcon: () => (
          <Image
            source={addbookIcon}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />
     <Tab.Screen
      name="Logout"
      component={LogoutScreen}
      options={{
        title: 'Logout',
        tabBarIcon: () => (
          <Image
            source={logoutIcon}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />

  </Tab.Navigator>
);

export default TabNavigator;
