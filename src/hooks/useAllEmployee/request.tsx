import axios from '../../config/axios';

export const fetchAllEmployee = async () => {
  const data = await axios.get(`http://localhost:3000/employees/admin`);
  return data;
};
