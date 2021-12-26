import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Form from '../components/Form/Form';

import { post, update, getById } from '../services/todo';

const TaskForm = () => {
  const params = useParams();

  const [todoData, setTodoData] = useState({
    id: undefined,
    title: undefined,
    description: undefined,
  });

  useEffect(() => {
    if (params.id !== undefined) {
      const getTODO = async () => {
        try {
          const todosAPIresponse = await getById(params.id);
          if (todosAPIresponse.status === 200) {
            setTodoData(todosAPIresponse.data);
          }
        } catch (error) {
          alert(error);
        }
      };

      getTODO();
    }

    return () => {
      setTodoData({
        id: undefined,
        title: undefined,
        description: undefined,
      });
    };
  }, [params.id]);

  // Create a Task
  if (todoData.id === undefined) return <Form method={post} />;
  // Update a Task
  return <Form todoData={todoData} method={update} />;
};

export default TaskForm;
