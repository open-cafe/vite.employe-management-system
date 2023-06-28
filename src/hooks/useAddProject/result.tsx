import axios from '../../config/axios';

export const addProject = async (body: object) => {
  const data = await axios.post('/projects', body);
  return data;
};
