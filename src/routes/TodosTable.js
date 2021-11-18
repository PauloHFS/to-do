import { useState, useEffect } from 'react';

import { getAll } from '../services/todo';

const TodosTable = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosResponse = await getAll();
        setTodos(todosResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTodos();
  }, []);

  return (
    <>
      <main>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
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
};

export default TodosTable;
