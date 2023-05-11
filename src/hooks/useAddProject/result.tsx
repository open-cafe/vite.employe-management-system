import axios from '../../config/axios';

export const addProject = async (body: object) => {
  console.log(body);
  const data = await axios.post('/project', body);
  return data;
};
