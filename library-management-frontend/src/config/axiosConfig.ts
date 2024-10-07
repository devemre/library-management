import axios from 'axios';
import { store } from '../store';
import { setLoading } from '../store/slices/preloaderSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
  (request) => {
    store.dispatch(setLoading(true));
    return request;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false));
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

export default axiosInstance;
