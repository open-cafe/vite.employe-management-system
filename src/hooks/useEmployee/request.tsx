import axios from '../../config/axios';

export const fetchEmployees = async (page: number, pageSize: number) => {
  const data = await axios.get(
    `http://localhost:3000/employees?page=${page}&limit=${pageSize}`
  );
  return data;
};
