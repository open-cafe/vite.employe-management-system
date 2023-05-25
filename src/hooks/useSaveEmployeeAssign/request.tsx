import axios from '@/config/axios';
interface IBody {
  projectId: string;
  employeeId: string[];
}

export const saveEmployeeAssign = async (body: IBody) => {
  const data = await axios.post(
    `project-assignments/projects/${body.projectId}/employees`,
    body
  );
  return data;
};
