import client from '../providers/todo-api';

const post = body => {
  client.post('/', body);
};

const getAll = () => {
  return client.get('/');
};

const update = ({ id, ...body }) => {
  client.put(`/${id}`, body);
};

const del = id => {
  client.delete(`/${id}`);
};

export { post, getAll, update, del };
