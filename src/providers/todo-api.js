import axios from 'axios';

const client = axios.create({
  baseURL: 'https://to-do-api-pauloh.herokuapp.com/',
});

export default client;
