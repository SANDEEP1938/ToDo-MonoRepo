import { Todo } from "@m-to-do/CRUD";

export function filter(): string {
  return 'filter';
}

const sortedTodos = (todos: Todo[], sortBy: string) => {
  return todos.sort((a, b) => {
    if (sortBy === 'taskTitle') {
      return a.text.localeCompare(b.text);
    } else {
      return a.id - b.id;
    }
  });
};

export const filteringTodos=(filterBy:string, todos: Todo[], sortBy: string)=>{
  if (filterBy === 'completed') {
    return sortedTodos(todos, sortBy).filter(todo => todo.completed);
  } else if (filterBy === 'pending') {
    return sortedTodos(todos, sortBy).filter(todo => !todo.completed);
  }
  return sortedTodos(todos, sortBy);
}