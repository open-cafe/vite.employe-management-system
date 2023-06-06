import axios from '../../config/axios';

export const verifyToken = async (body: object) => {
  const data = await axios.post('/user/verify/token', body);
  return data;
};
