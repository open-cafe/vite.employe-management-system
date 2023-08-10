import axios from '../../config/axios';

export const fetchCheckInOut = async (page: number, limit: number) => {
  const data = await axios.get(`/checkinout?page=${page}&limit=${limit}`);
  return data;
};

export const addCheckIn = async () => {
  const data = await axios.post('/employee/checkin');
  return data;
};

export const fetchLatestCheckIn = async () => {
  const data = await axios.get(`/employee/checkinout/latest`);
  return data;
};

export const updateCheckIn = async () => {
  const data = await axios.patch(`/employee/checkout`);
  return data;
};
