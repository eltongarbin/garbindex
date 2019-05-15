import axios from 'axios';

const client = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
});

const request = function(options) {
  const onSuccess = function(response) {
    return response.data;
  };

  const onError = function(error) {
    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
