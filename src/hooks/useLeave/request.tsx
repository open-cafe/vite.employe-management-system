import axios from '@/config/axios';

export const fetchLeave = async (page: number, limit: number) => {
  const data = await axios.get(`/leaves?page=${page}&limit=${limit}`);
  return data;
};
