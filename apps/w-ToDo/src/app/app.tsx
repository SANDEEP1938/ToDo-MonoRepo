import React, { createContext, useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import Login from './Login';
import { loginCheck, userLogout } from '@m-to-do/auth';
import { addNewTodo, editTodoItem, readTodos, TodoItemCompelte } from '@m-to-do/CRUD';
import { filteringTodos } from '@m-to-do/filter';
import SortFilter from './SortFilter';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface UserContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
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

export function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sortBy, setSortBy] = useState<string>('creationDate');
  const [filterBy, setFilterBy] = useState<string>('all');


  useEffect(() => {
    loadTodos();
    checkSession();
  }, []);

  const loadTodos = async () => {
    await readTodos().then(res => {
      setTodos(res || []);
    });
  };

  const checkSession = () => {
    const session = localStorage.getItem('session');
    if (session) {
      setIsLoggedIn(true);
    }
  };

  const addTodo = async () => {
    await addNewTodo(todo, todos).then(res => {
      if (res !== 'Invalid') {
        setTodos(res);
        setTodo('');
        alert('Todo added successfully!');
      }
    });
  };

  const editTodo = async (id: number, newText: string) => {
    await editTodoItem(id, newText, todos).then(res => {
      setTodos(res);
      setEditId(null);
      setTodo('');
      alert('Todo updated successfully!');
    });
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
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
    userLogout();
    setIsLoggedIn(false);
  };

  const filteredTodos = () => {
    return filteringTodos(filterBy, todos, sortBy)
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    TodoItemCompelte(id, todos)
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleComplete, editTodo, todo, setTodo, editId, setEditId, filteredTodos, setSortBy, setFilterBy }}>
        <div>
          {isLoggedIn ? (
            <>
              <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} editId={editId} editTodo={editTodo} />
              <SortFilter setSortBy={setSortBy} setFilterBy={setFilterBy} />
              <TodoList todos={filteredTodos()} toggleComplete={toggleComplete} setEditId={setEditId} setTodo={setTodo} deleteTodo={deleteTodo} />
              <button onClick={logout}>LOGOUT</button>
            </>
          ) : (
            <Login/>
          )}
        </div>
      </TodoContext.Provider>
    </UserContext.Provider >
  );
}

export default App;
