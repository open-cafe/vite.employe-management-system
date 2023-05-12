import axios from '../../config/axios';

export const addProject = async (body: object) => {
  const data = await axios.post('/project', body);
  return data;
};
