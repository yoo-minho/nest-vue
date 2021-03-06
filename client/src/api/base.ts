import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: { Accept: 'application/json' },
});

axiosClient.interceptors.request.use(
  function (config) {
    //console.log('axios.interceptors.request1', { config });
    return config;
  },
  function (error) {
    //console.log('axios.interceptors.request2', { error });
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    //console.log('axios.interceptors.response1', { response });
    return response;
  },
  function (error) {
    //console.log('axios.interceptors.response2', { error });
    return Promise.reject(error);
  },
);

export default axiosClient;
