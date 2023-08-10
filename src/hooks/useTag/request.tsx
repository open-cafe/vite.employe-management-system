import axios from '@/config/axios';

export const fetchTag = async () => {
  const data = await axios.get(`/tags`);
  return data;
};
