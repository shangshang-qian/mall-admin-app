// 用于获取到类目的列表信息
import axios from '@/axios';

export default {
  list(params) {
    return axios.get('/category/all', {
      params,
    });
  },
  add(params) {
    return axios.post('/category/add', params);
  },
  delete(id) {
    return axios.delete(`/category/${id}`);
  },
  edit(params) {
    return axios.put('/category/edit', params);
  },
};
