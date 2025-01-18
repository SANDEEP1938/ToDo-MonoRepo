import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  setEditId: (id: number) => void;
  setTodo: (text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo, setEditId, setTodo }) => {
  return (
    <View style={styles.todoItem}>
      <Text style={{ textDecorationLine: todo.completed ? 'line-through' : 'none', marginVertical: 10 }}>
        {todo.text}
      </Text>
      <View style={styles.buttonContainer}>
        <Icon name="check" size={20} color="green" onPress={() => toggleComplete(todo.id)} />
        <Icon name="edit" size={20} color="orange" onPress={() => { setEditId(todo.id); setTodo(todo.text); }} />
        <Icon name="trash" size={20} color="red" onPress={() => deleteTodo(todo.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    paddingHorizontal: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
});

export default TodoItem;
