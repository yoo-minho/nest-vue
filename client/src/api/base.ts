import qs from 'qs';
import axios from 'axios';
import { useAxios } from '@vueuse/integrations/useAxios';

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
  async function (response) {
    //await delay(1000);
    //console.log('axios.interceptors.response1', { response });
    return response;
  },
  function (error) {
    //console.log('axios.interceptors.response2', { error });
    return Promise.reject(error);
  },
);

export default axiosClient;
export const useAxiosGetArray = (url: string, data?: object) => {
  return useAxiosGet(url, { ...data, paramsSerializer: qs.stringify });
};
export const useAxiosGet = (url: string, data?: object) => useAxios(url, { method: 'GET', ...data }, axiosClient);
export const useAxiosPost = (url: string, data: object) => useAxios(url, { method: 'POST', data }, axiosClient);
export const useAxiosDelete = (url: string) => useAxios(url, { method: 'DELETE' }, axiosClient);
