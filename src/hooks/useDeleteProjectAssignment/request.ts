import axios from '@/config/axios';
interface IDeleteProjectAssignment {
  projectAssignmentId: string;
}

export const deleteProjectAssignment = async (
  body: IDeleteProjectAssignment
) => {
  const data = await axios.delete(
    `/project-assignments/${body.projectAssignmentId}`
  );
  return data;
};
