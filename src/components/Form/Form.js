import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { post, update } from '../../services/todo';
import { useEffect } from 'react';

const Form = ({ type, todoData, method }) => {
  let navigate = useNavigate();
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    if (todoData) {
      setValue([
        { title: todoData.title },
        { description: todoData.description },
      ]);
    }
  }, [todoData]);

  const onSubmit = async ({ title, description }) => {
    const todoID = todoData.id;

    try {
      let todosAPIresponse;
      if (todoID) {
        todosAPIresponse = await update({ id: todoID, title, description });
      } else {
        todosAPIresponse = await post({ title, description });
      }
      navigate('/');
      alert(todosAPIresponse.statusText);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input type="text" {...register('title')} />
        <label htmlFor="description">Description</label>
        <input type="text" {...register('description')} />
        <button>Enviar</button>
      </form>
    </>
  );
};

export default Form;
