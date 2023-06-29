import axios from '@/config/axios';

export const fetchProjectByStatus = async () => {
  const data = await axios.get(`/projects/status/all`);
  return data;
};

export const fetchEmployeeOnLeaveToday = async () => {
  const data = await axios.get(`/leaves/today/all`);
  return data;
};

export const fetchEmployeeApplyLeaveToday = async () => {
  const data = await axios.get(`/leaves/today/count`);
  return data;
};

export const fetchEmployeeCount = async () => {
  const data = await axios.get(`/employees/count`);
  return data;
};
