import axios from '@/config/axios';
interface IUpdateProject {
  projectId: string;
  projectName: string;
  description: string;
  status: string;
}
export const updateProject = async (body: IUpdateProject) => {
  const data = await axios.put(`/projects/${body.projectId}`, body);
  return data;
};
