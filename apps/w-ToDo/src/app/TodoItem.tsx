import React from 'react';
import './TodoItem.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  toggleComplete: (id: number) => void;
  setEditId: (id: number) => void;
  setTodo: (text: string) => void;
  todo: Todo;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo, setEditId, setTodo }) => {
  return (
    <div className="todo-item">

      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
      <button className="btn complete" onClick={() => toggleComplete(todo.id)}>✔️</button>

      <button className="btn edit" onClick={() => { setEditId(todo.id); setTodo(todo.text); }}>✏️</button>

      <button className="btn delete" onClick={() => deleteTodo(todo.id)}>🗑️</button>

    </div>
  );
};

export default TodoItem;
