import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { post, update, getById } from '../services/todo';

const TaskForm = () => {
  const [todoData, setTodoData] = useState({ title: '', description: '' });
  const params = useParams();

  const { handleSubmit, register } = useForm();

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

  const onSubmit = async ({ title, description }) => {
    const todoID = params.id;

    try {
      let todosAPIresponse;
      if (todoID) {
        todosAPIresponse = await update({ id: todoID, title, description });
      } else {
        todosAPIresponse = await post({ title, description });
      }
      alert(todosAPIresponse.statusText);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title</label>
      <input type="text" {...register('title')} defaultValue={todoData.title} />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        {...register('description')}
        defaultValue={todoData.description}
      />
      <button>Enviar</button>
    </form>
  );
};

export default TaskForm;
