import { AxiosResponse } from 'axios';
import axios from '../../config/axios';

export const fetchEmployees = async () => {
  const data = await axios.get(`http://localhost:3000/employees`);
  return data;
};
