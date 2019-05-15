import request from 'utils/request';

export default {
  get: (param) =>
    request({
      url: `/ability/${param}`,
      method: 'GET'
    })
};
