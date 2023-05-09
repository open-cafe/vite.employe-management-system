import { AxiosResponse } from 'axios';
import axios from '../../config/axios';

export const fetchProject = async () => {
  const data = await axios.get(`http://localhost:3000/project?limit=10`);
  return data;
};
