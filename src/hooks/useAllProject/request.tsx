import axios from '../../config/axios';

export const fetchAllProject = async () => {
  const data = await axios.get(`http://localhost:3000/projects/admin`);
  return data;
};
