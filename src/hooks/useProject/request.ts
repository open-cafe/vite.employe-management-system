import axios from '@/config/axios';

interface IDeleteProject {
  projectId: string;
}

interface IUpdateProject {
  projectId: string;
  projectName: string;
  description: string;
  status: string;
}

interface IfetchProject {
  page: number;
  limit: number;
}

export const fetchProject = async ({ page, limit }: IfetchProject) => {
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

export const updateProject = async (body: IUpdateProject) => {
  const data = await axios.put(`/projects/${body.projectId}`, body);
  return data;
};
