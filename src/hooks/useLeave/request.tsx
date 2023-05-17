import axios from '../../config/axios';

export const fetchLeave = async () => {
  const data = await axios.get(`http://localhost:3000/leave`);
  return data;
};
