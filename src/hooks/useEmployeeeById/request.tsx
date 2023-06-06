import axios from '@/config/axios';

export const fetchEmployeeById = async () => {
  const data = await axios.get(`/employees/byId`);
  return data;
};
