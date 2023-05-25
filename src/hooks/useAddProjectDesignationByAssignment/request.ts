import axios from '@/config/axios';
interface IAddProjectDesignationByAssignment {
  projectAssignmentId: string;
  tagId: string;
}

export const addProjectDesignationByAssignment = async (
  body: IAddProjectDesignationByAssignment
) => {
  const data = await axios.post(`/project-designations`, body);
  return data;
};
