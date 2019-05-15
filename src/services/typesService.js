import request from 'utils/request';

export default {
  get: (param) =>
    request({
      url: `/type/${param}`,
      method: 'GET'
    })
};
