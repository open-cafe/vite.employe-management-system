import axios from '@/config/axios';

export const loginUser = async (body: object) => {
  const data = await axios.post('/user/login', body);
  return data;
};
