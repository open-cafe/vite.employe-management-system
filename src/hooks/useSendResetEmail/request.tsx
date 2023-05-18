import axios from '@/config/axios';

export const sendResetPasswordMail = async (body: object) => {
  const data = await axios.post('/user/resetpasswordmail', body);
  return data;
};
