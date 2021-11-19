import client from '../providers/todo-api';

const post = body => client.post('/', body);

const getAll = () => client.get('/');

const getById = id => client.get(`/${id}`);

const update = ({ id, ...body }) => client.put(`/${id}`, body);

const del = id => client.delete(`/${id}`);

export { post, getAll, getById, update, del };
