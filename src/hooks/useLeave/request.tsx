import { AxiosResponse } from 'axios';
import axios from '../../config/axios';

export const fetchLeave = async (page: number, limit: number) => {
  const data = await axios.get(
    `http://localhost:3000/leaves?page=${page}&limit=${limit}`
  );
  return data;
};
