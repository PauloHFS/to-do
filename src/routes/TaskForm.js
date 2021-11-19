import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getById } from '../services/todo';

const TaskForm = () => {
  const [todoData, setTodoData] = useState({ title: '', description: '' });

  let params = useParams();

  useEffect(() => {
    const todoID = params.id;

    const getTODO = async () => {
      try {
        const todosAPIresponse = await getById(todoID);
        if (todosAPIresponse.status === 200) {
          setTodoData(todosAPIresponse.data);
        }
      } catch (error) {
        alert(error);
      }
    };

    getTODO();
  }, [params.id]);

  return (
    <form>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" defaultValue={todoData.title} />
      <label htmlFor="description">Description</label>
      <input type="text" id="description" defaultValue={todoData.description} />
      <button onClick={() => console.log('Enviar')}>Enviar</button>
    </form>
  );
};

export default TaskForm;
