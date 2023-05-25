import axios from '@/config/axios';

export const fetchCurrentUser = async () => {
  const data = await axios.get(`/user/current`);

  return data;
};
