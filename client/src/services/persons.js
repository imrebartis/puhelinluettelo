import axios from 'axios';
const baseUrl = '/api/persons';

const requestWithResponseData = (request) => {
  return request.then((response) => response.data);
};

const getAll = () => {
  return requestWithResponseData(axios.get(baseUrl));
};

const create = (newObject) => {
  return requestWithResponseData(axios.post(baseUrl, newObject));
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newObject) => {
  return requestWithResponseData(axios.put(`${baseUrl}/${id}`, newObject));
};

export default {
  getAll,
  create,
  remove,
  update,
};
