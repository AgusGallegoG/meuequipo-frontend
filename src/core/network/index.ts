import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //-> Definido en .env
  headers: {
    'Content-Type': 'application/json',
  },
});

//Interceptor que añade el token JWT a la petición en caso de que exista
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default api;
