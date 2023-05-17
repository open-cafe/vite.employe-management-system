import axios from '../../config/axios';

export const fetchProject = async (
  projectId: string,
  page: number,
  limit: number
) => {
  const data = await axios.get(
    `http://localhost:3000/project-assignments/projects/${projectId}?page=${page}&limit=${limit}`
  );
  return data;
};
