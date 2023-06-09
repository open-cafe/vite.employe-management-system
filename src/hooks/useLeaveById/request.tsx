import axios from '@/config/axios';

export const fetchLeaveById = async (leaveId: string) => {
  const data = await axios.get(`/leave/${leaveId}`);
  return data;
};
