import axios from '../../config/axios';

export const fetchProject = async (page: number, limit: number) => {
  const data = await axios.get(
    `http://localhost:3000/projects?page=${page}&limit=${limit}`
  );
  return data;
};
