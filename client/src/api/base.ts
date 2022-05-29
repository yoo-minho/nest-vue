import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 1000,
  headers: { Accept: 'application/json' },
});
