export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
}
export function cRUD(): string {
  return 'CRUD';
}

export const addNewTodo = async (todo:string,todos:Todo[]) => {
  if (todo) {
    const newTodo: Todo = { id: Date.now(), text: todo, completed: false };
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    return updatedTodos;
  }else return 'Invalid'
};

export const readTodos = async() => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    const parsedTodos = JSON.parse(storedTodos);
    return parsedTodos;
  }
};
export const deleteTodoItem = async (id:number,todos:Todo[]) => {
  const updatedTodos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};

export const TodoItemCompelte = async (id:number,todos:Todo[]) => {
  const updatedTodos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};

export const editTodoItem = async (id:number,newText:string,todos:Todo[]) => {
  const updatedTodos = todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  return updatedTodos;
};