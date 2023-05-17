import axios from '../../config/axios';

export const fetchProject = async (
  projectId: string,
  page: number,
  limit: number
) => {
  const data = await axios.get(
    `/project-assignments/projects/${projectId}?page=${page}&limit=${limit}`
  );
  return data;
};
