import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL
});

const request = <T>(options: AxiosRequestConfig) =>
  client(options)
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: AxiosError) =>
      Promise.reject(error.response || error.message)
    );

export default request;
