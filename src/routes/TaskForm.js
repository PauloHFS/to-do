import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getById } from '../services/todo';

const TaskForm = () => {
  const [todoData, setTodoData] = useState({});

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
      <input type="text" id="title" value={todoData.title} />
      <label htmlFor="description">Description</label>
      <input type="text" id="description" value={todoData.description} />
      <input type="submit"></input>
    </form>
  );
};

export default TaskForm;
