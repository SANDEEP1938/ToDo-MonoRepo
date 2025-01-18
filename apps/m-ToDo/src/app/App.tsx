import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect, createContext } from 'react';
import TodoInput from '../../components/TodoInput';
import TodoList from '../../components/TodoList';
import SortFilter from '../../components/SortFilter';
import AuthForm from '../../components/AuthForm';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginCheck, userLogout } from '@m-to-do/auth';
import { addNewTodo, deleteTodoItem, editTodoItem, readTodos, TodoItemCompelte } from '@m-to-do/CRUD';
import { filteringTodos } from '@m-to-do/filter';


interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: () => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
  todo: string;
  setTodo: (text: string) => void;
  editId: number | null;
  setEditId: (id: number | null) => void;
  filteredTodos: () => Todo[];
  setSortBy: (sortBy: string) => void;
  setFilterBy: (filterBy: string) => void;
}

interface UserContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => { },
  deleteTodo: () => { },
  toggleComplete: () => { },
  editTodo: () => { },
  todo: '',
  setTodo: () => { },
  editId: null,
  setEditId: () => { },
  filteredTodos: () => [],
  setSortBy: () => { },
  setFilterBy: () => { },
});

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  login: async () => { },
  logout: () => { },
});

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('creationDate');
  const [filterBy, setFilterBy] = useState<string>('all');
  
  useEffect(() => {
    loadTodos();
    checkSession();
  }, []);

  const loadTodos = async() => {
     await readTodos().then(res=>{
      setTodos(res);
    })};

  const checkSession = () => {
    const session = localStorage.getItem('session');
    if (session) {
      setIsLoggedIn(true);
    }
  };

  const addTodo = async() => {
   await addNewTodo(todo,todos).then(res=>{
    if(res !== 'Invalid'){
        setTodos(res);
        setTodo('');
        alert('Todo added successfully!');
    }})
  };

  const deleteTodo = (id: number) => {
    deleteTodoItem(id,todos)
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    TodoItemCompelte(id,todos)
  };

  const editTodo = async(id: number, newText: string) => {
   await editTodoItem(id,newText,todos).then(res=>{
    setTodos(res);
    setEditId(null);
    setTodo('');
    alert('Todo updated successfully!');
   })};

  const filteredTodos = () => {
    return filteringTodos(filterBy, todos, sortBy)
  };

  const login = async (username: string, password: string) => {
    await loginCheck(username, password).then(res => {
      if (res == "validUser")
        setIsLoggedIn(true)
      else
        alert('Invalid credentials');
    }).catch((error) => {
      console.log('error: ', error);
    })
  };

  const logout = () => {
    userLogout()
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleComplete, editTodo, todo, setTodo, editId, setEditId, filteredTodos, setSortBy, setFilterBy }}>
        <View style={styles.container}>
          {isLoggedIn ? (
            <>
              <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} editId={editId} editTodo={editTodo} />
              <SortFilter setSortBy={setSortBy} setFilterBy={setFilterBy} />
              <TodoList todos={filteredTodos()} toggleComplete={toggleComplete} deleteTodo={deleteTodo} setEditId={setEditId} setTodo={setTodo} />
              <Icon.Button name="sign-out" backgroundColor="#ff4d4d" onPress={logout}>
                Logout
              </Icon.Button>
            </>
          ) : (
            <AuthForm />
          )}
          <StatusBar style="auto" />
        </View>
      </TodoContext.Provider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
