import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL
});

const request = function(options: any) {
  const onSuccess = function(response: any) {
    return response.data;
  };

  const onError = function(error: any) {
    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
