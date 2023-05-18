import axios from '@/config/axios';

export const resetPassword = async (body: object) => {
  const data = await axios.post('/user/resetpassword', body);
  return data;
};
