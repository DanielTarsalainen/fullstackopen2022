import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (newObject) => {
  const postConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, postConfig);
  return response.data;
};

const updateBlog = async (id, newObject) => {
  const updateConfig = {
    headers: { Authorization: token },
  };

  const request = axios.put(`${baseUrl}/${id}`, newObject, updateConfig);

  return request.then((response) => response.data);
};

const deleteBlog = async (id) => {
  const deleteConfig = {
    headers: { Authorization: token },
  };

  const requestDelete = axios.delete(`${baseUrl}/${id}`, deleteConfig);
  return requestDelete.then((response) => response.data);
};

const blogService = {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken,
};

export default blogService;
