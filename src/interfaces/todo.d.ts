export interface Todo {
  id: string | number;
  text: string;
  completed: boolean;
  priority: boolean;
  category: string;
  dueDate: string;
  createAt?: string;
}

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'completed' | 'pending';
  search: string;
}