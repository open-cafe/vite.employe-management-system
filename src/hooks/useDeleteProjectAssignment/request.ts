import axios from '@/config/axios';
interface IDeleteProjectAssignment {
  projectAssignmentId: string;
}

export const deleteProjectAssignment = async (
  body: IDeleteProjectAssignment
) => {
  console.log(body);
  const data = await axios.delete(
    `/project-assignments/${body.projectAssignmentId}`
  );
  return data;
};
