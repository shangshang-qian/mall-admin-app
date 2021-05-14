// 这里提供用户相关功能的接口

import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
};
