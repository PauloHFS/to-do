import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { getAll, del } from '../services/todo';

const TodosTable = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const delTodo = async id => {
    try {
      const todosAPIresponse = await del(id);
      if (todosAPIresponse.status === 200) {
        alert('Deletado com sucesso!');
        getTodos();
      }
    } catch (error) {
      alert(error);
    }
  };

  const getTodos = async () => {
    try {
      const todosResponse = await getAll();
      setTodos(todosResponse.data);
    } catch (error) {
      alert(error);
    }
  };

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
                <td>
                  <button>
                    <Link to={`/taskform/${id}`}>Edit</Link>
                  </button>
                  <button onClick={() => delTodo(id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default TodosTable;
