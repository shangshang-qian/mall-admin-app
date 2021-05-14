import axios from '@/axios';
// 删除信息
export default {
  list(params) {
    return axios.get('/products/all', { params });
  },
  removeColumn(id) {
    return axios.delete(`/products/${id}`);
  },
  add(data) {
    return axios.post('/products/add', data);
  },
  detail(id) {
    return axios.get(`/products/${id}`);
  },
  edit(params) {
    return axios.put('/products/edit', params);
  },
};
