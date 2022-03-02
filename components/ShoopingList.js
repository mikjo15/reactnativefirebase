import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import Header from './Header';
import ListItem from './ListItem';
import AddItem from './AddItem';

// https://medium.com/geekculture/ill-be-building-a-todo-app-with-one-of-the-most-popular-web-application-frameworks-react-and-75ffe4b32dc4

const ShoppingList = ({user}) => {
  const [items, setItems] = useState([]);

  const reference = firebase
    .app()
    .database(
      'https://fir-practice-e088c-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref('/groceries/' + user.uid); // Kunne blive ændret til /groceries, men ikke nødvendigt på

  useEffect(() => {
    reference.on('value', snapshot => {
      const groceryItems = snapshot.val();
      const groceryList = [];

      for (let id in groceryItems) {
        const text = groceryItems[id];
        const newItem = {id, text};
        groceryList.push(newItem);
      }

      setItems(groceryList);
    });
  }, []);

  const deleteItem = id => {
    groceryRef = reference.child(id);
    groceryRef.remove();
  };

  const addItem = text => {
    if (!text) {
      Alert.alert(
        'No item entered',
        'Please enter an item when adding to your shopping list',
        [
          {
            text: 'Understood',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      reference.push(text);
    }
  };

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem={addItem} />
      <View style={styles.test}></View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      />
      <TouchableOpacity style={styles.btn} onPress={() => logOut()}>
        <Text style={styles.btnText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#c2bad8',
    borderRadius: 5,
    padding: 9,
    margin: 30,
    alignItems: 'center',
  },
});

export default ShoppingList;
