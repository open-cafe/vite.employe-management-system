import axios from '@/config/axios';

export const fetchProjectById = async (projectId: string) => {
  const data = await axios.get(`/projects/${projectId}`);
  return data;
};
