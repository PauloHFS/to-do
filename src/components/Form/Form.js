import { Fragment, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { post, update } from '../../services/todo';

const Form = ({ todoData, method }) => {
  let navigate = useNavigate();

  const { handleSubmit, register, setValue } = useForm();

  const [todo, setTodo] = useState({});

  useEffect(() => {
    if (todoData) {
      ['title', 'description'].forEach(field =>
        setValue(field, todoData[field])
      );
      setTodo(todoData);
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
    <Fragment>
      <h3>{todoData ? 'Edit mode' : 'Add mode'}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input type="text" {...register('title')} />
        <label htmlFor="description">Description</label>
        <input type="text" {...register('description')} />
        <button>Enviar</button>
      </form>
    </Fragment>
  );
};

export default Form;
