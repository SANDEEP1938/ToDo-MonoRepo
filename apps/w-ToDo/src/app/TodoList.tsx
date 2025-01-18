import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  toggleComplete: (id: number) => void;
  setEditId: (id: number) => void;
  setTodo: (text: string) => void;
  todos: Todo[];
  // editTodo?: (id: number,newText:string) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, deleteTodo, setEditId, setTodo }) => {
  return (
    <div>
      {todos?.map((todo) => (
        <TodoItem 
          toggleComplete={toggleComplete}
          setEditId={setEditId}
          setTodo={setTodo}
          key={todo.id} 
          todo={todo} 
          // editTodo={editTodo} 
          deleteTodo={deleteTodo} 
        />
      ))}
    </div>
  );
};

export default TodoList;
