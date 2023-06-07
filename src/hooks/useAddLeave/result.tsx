import axios from '@/config/axios';

export const addLeave = async (body: object) => {
  const data = await axios.post('/leaves', body);
  return data;
};
