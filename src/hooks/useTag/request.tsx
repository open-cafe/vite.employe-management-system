import { AxiosResponse } from 'axios';
import axios from '../../config/axios';

export const fetchTag = async () => {
  const data = await axios.get(`http://localhost:3000/tag?limit=10`);
  return data;
};
