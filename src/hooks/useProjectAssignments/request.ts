import axios from '@/config/axios';

interface IDeleteProjectAssignment {
  projectAssignmentId: string;
}

export const fetchProject = async (
  projectId: string,
  page: number,
  limit: number
) => {
  const data = await axios.get(
    `/project-assignments/projects/${projectId}?page=${page}&limit=${limit}`
  );
  return data;
};

export const addProjectAssignment = async (body: object) => {
  const data = await axios.post('/project-assignments', body);
  return data;
};

export const deleteProjectAssignment = async (
  body: IDeleteProjectAssignment
) => {
  const data = await axios.delete(
    `/project-assignments/${body.projectAssignmentId}`
  );
  return data;
};
