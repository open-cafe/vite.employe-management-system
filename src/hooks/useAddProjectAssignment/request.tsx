import axios from '../../config/axios';

export const addProjectAssignment = async (body: object) => {
  const data = await axios.post('/project-assignments', body);
  return data;
};
