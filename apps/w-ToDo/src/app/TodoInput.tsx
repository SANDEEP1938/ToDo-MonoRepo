import React from 'react';
import './TodoInput.css'

interface TodoInputProps {
  todo: string;
  setTodo: (text: string) => void;
  editId: number | null;
  editTodo: (id: number, newText: string) => void;
  addTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ todo, setTodo, addTodo, editId, editTodo }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      editId ? editTodo(editId, todo) : addTodo(todo);
      setTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-container">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add or Edit ToDo"
        className="todo-input"
      />
      <button type="submit" className="submit-button">{editId ? 'Update ToDo' : 'Add ToDo'}</button> {/* Added className */}
    </form>
  );
};

export default TodoInput;
