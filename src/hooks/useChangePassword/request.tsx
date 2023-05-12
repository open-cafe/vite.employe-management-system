import axios from '../../config/axios';

export const ChangePassword = async (body: object) => {
  const data = await axios.patch('/user', body);
  return data;
};
