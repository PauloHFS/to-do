import { useState, useEffect } from 'react';
import { getAll } from './services/todo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosResponse = await getAll();
        console.log(todosResponse.data);
        setTodos(todosResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTodos();
  }, []);

  return (
    <>
      <h1>TO DO</h1>
      <main>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(({ id, title, description }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
