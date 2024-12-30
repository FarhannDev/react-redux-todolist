import { useSelector } from 'react-redux';
import { getAllTodos } from '../features/todos/TodoSlice';

export default function Home() {
  const todos = useSelector(getAllTodos);

  console.log({ todos });

  return <div>Home</div>;
}
