import axios from '@/config/axios';
export const fetchEmployees = async (page: number, pageSize: number) => {
  const data = await axios.get(`/employees?page=${page}&limit=${pageSize}`);
  return data;
};
