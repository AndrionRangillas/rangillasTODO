import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, ImageBackground,} from 'react-native';
import { useStore } from './store';
import TodoItem from './TodoItem';

const backgroundImg = require('../assets/Sun.jpg');

export const TodoList = () => {
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);

  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo) {
      addTodo({
        id: Date.now(),
        text: newTodo
      });
      setNewTodo('');
    }
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.header}>Today's Tasks</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new task"
            value={newTodo}
            onChangeText={(text) => setNewTodo(text)}
          />
          <Button title="ADD" onPress={handleAddTodo} color="#FFC300"  style={styles.addButton} />
        </View>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem text={item.text} id={item.id} />
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#5C1B8C', // Semi-transparent black background
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 16,
    padding: 8,
    backgroundColor: '#FFC300',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14, // Reduced the font size
    color: '#000000',
    borderWidth: 5,
    borderColor: '#BDBDBD',
    fontFamily: 'YourCustomMathSansBoldItalicFont',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000 ',
    fontFamily: 'YourCustomMathSansBoldItalicFont',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  addButton: {
    fontFamily: 'YourCustomMathSansBoldItalicFont',
    fontStyle: 'italic',
    fontWeight: 'bold',
    borderRadius: 20,


    fontSize: 32, // Set the font size of the button
  },
});

export default TodoList;
