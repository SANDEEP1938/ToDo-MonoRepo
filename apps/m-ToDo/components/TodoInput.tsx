import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface TodoInputProps {
  todo: string;
  setTodo: (text: string) => void;
  addTodo: () => void;
  editId: number | null;
  editTodo: (id: number, newText: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ todo, setTodo, addTodo, editId, editTodo }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Add or Edit ToDo"
        value={todo}
        onChangeText={setTodo}
      />
      <View style={styles.buttonContainer}>
        <Icon.Button name="plus" backgroundColor="#007bff" onPress={editId ? () => editTodo(editId, todo) : addTodo}>
          {editId ? 'Update ToDo' : 'Add ToDo'}
        </Icon.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '200%',
    alignSelf:'center',
    borderColor: '#007bff',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignSelf:'center',
    width: '75%',
  },
});

export default TodoInput;
