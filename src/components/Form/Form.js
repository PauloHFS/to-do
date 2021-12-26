import { Fragment, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { TextField, Button } from '@mui/material';

import { StyledForm } from './Form.styles';

import { post, update } from '../../services/todo';

const Form = ({ todoData }) => {
  let navigate = useNavigate();

  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    if (todoData) {
      ['title', 'description'].forEach(field =>
        setValue(field, todoData[field])
      );
    }
  }, [todoData, setValue]);

  const onSubmit = async ({ title, description }) => {
    try {
      let todosAPIresponse;
      if (todoData?.id) {
        todosAPIresponse = await update({
          id: todoData.id,
          title,
          description,
        });
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
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <TextField variant="standard" {...register('title')} />

        <label htmlFor="description">Description</label>
        <TextField multiline rows={4} {...register('description')} />

        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </StyledForm>
    </Fragment>
  );
};

export default Form;
