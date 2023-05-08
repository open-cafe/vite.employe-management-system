import { AxiosResponse } from 'axios';
import axios from '../../config/axios';

export const fetchCheckInOut = async () => {
  const data = await axios.get(`http://localhost:3000/checkinout`);
  return data;
};
