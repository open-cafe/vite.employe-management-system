import axios from '../../config/axios';

export const addUser = async (body: object) => {
  const data = await axios.post('/user', body);
  return data;
};
