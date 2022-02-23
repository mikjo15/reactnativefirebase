import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {firebase} from '@react-native-firebase/database';

import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

// https://medium.com/geekculture/ill-be-building-a-todo-app-with-one-of-the-most-popular-web-application-frameworks-react-and-75ffe4b32dc4

const reference = firebase
  .app()
  .database(
    'https://fir-practice-e088c-default-rtdb.europe-west1.firebasedatabase.app/',
  )
  .ref('/'); // Kunne blive ændret til /groceries, men ikke nødvendigt på

const App = () => {
  const [items, setItems] = useState([]);

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

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem={addItem} />
      <View style={styles.test}>{/*<Text>{testText}</Text>*/}</View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
