import axios from 'axios';

/* const base_url = process.env.REACT_APP_TO_DO_API_URL; */

const client = axios.create({
  baseURL: 'http://localhost:3333',
});

export default client;
