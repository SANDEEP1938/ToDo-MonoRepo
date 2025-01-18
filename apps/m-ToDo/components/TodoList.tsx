import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  setEditId: (id: number) => void;
  setTodo: (text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, deleteTodo, setEditId, setTodo }) => {
  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          setEditId={setEditId}
          setTodo={setTodo}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
});

export default TodoList;
