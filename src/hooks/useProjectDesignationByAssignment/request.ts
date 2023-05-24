import axios from '@/config/axios';

export const fetchProjectDesignationByAssignmemt = async (
  projectAssignmentId: string,
  page: number,
  limit: number
) => {
  const data = await axios.get(
    `/project-designations/project-assignments/${projectAssignmentId}`
  );
  return data;
};
