import axios from '@/config/axios';

export const fetchAllRole = async () => {
  const data = await axios.get(`/role`);
  return data;
};
