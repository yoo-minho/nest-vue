import qs from 'qs';
import axios from 'axios';
import { useAxios } from '@vueuse/integrations/useAxios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  //baseURL: '/api',
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
  async function (response) {
    handleDates(response.data);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosClient;
export const useAxiosGetArray = (url: string, data?: object) =>
  useAxiosGet(url, { ...data, paramsSerializer: qs.stringify });
export const useAxiosGet = (url: string, data?: object) => useAxios(url, { method: 'GET', ...data }, axiosClient);
export const useAxiosPost = (url: string, data?: object) => useAxios(url, { method: 'POST', ...data }, axiosClient);
export const useAxiosDelete = (url: string) => useAxios(url, { method: 'DELETE' }, axiosClient);
export const useAxiosPatch = (url: string, data?: object) => useAxios(url, { method: 'PATCH', ...data }, axiosClient);

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/gi;
const handleDates = (body: { [key: string]: any }) => {
  if (typeof body === 'object') {
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (isoDateFormat.test(value)) body[key] = new Date(value);
      else if (typeof value === 'object') handleDates(value);
    }
  }
};
