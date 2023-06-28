import axios from '@/config/axios';

interface IDeleteProject {
  projectId: string;
}

export const fetchProject = async (page: number, limit: number) => {
  const data = await axios.get(`/projects?page=${page}&limit=${limit}`);
  return data;
};

export const addProject = async (body: object) => {
  const data = await axios.post('/projects', body);
  return data;
};

export const deleteProject = async (body: IDeleteProject) => {
  const data = await axios.delete(`/projects/${body.projectId}`);
  return data;
};

export const fetchProjectById = async (projectId: string) => {
  const data = await axios.get(`/projects/${projectId}`);
  return data;
};
