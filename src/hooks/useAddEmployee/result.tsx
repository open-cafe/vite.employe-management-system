import axios from '@/config/axios';

export const addEmployee = async (body: object) => {
  const data = await axios.post('/employees', body);
  return data;
};
