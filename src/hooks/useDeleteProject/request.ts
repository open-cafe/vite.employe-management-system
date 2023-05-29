import axios from '@/config/axios';
interface IDeleteProject {
  projectId: string;
}

export const deleteProject = async (body: IDeleteProject) => {
  const data = await axios.delete(`/projects/${body.projectId}`);
  return data;
};
