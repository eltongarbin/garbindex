import request from 'utils/request';

export default {
  get: (param) =>
    request({
      url: `/pokemon/${param}`,
      method: 'GET'
    })
};
