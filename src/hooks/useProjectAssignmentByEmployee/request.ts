import axios from '../../config/axios';

export const fetchProject = async (
  //   employeeId: string,
  page: number,
  limit: number
) => {
  const data = await axios.get(
    `/employee/projects?page=${page}&limit=${limit}`
  );
  return data;
};
