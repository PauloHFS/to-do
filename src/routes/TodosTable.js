import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';

import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { getAll, del } from '../services/todo';

const TodosTable = () => {
  let navigate = useNavigate();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const todosResponse = await getAll();
      setTodos(todosResponse.data);
    } catch (error) {
      alert(error);
    }
  };

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

  if (todos.length === 0) return <strong>LOADING...</strong>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map(({ id, title, description }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/taskform/${id}`)}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => delTodo(id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodosTable;
