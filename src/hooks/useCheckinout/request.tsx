import axios from '../../config/axios';

export const fetchCheckInOut = async (page: number, limit: number) => {
  const data = await axios.get(
    `http://localhost:3000/checkinout?page=${page}&limit=${limit}`
  );
  return data;
};
