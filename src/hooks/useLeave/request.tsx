import axios from '@/config/axios';
import { Dayjs } from 'dayjs';

export const fetchLeave = async (page: number, limit: number) => {
  const data = await axios.get(`/leaves?page=${page}&limit=${limit}`);
  return data;
};

export const addLeave = async (body: object) => {
  const data = await axios.post('/leaves', body);
  return data;
};

interface UpdateLeave {
  leaveId: string;
  leaveType: string;
  reason: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}
export const updateLeave = async (body: UpdateLeave) => {
  const data = await axios.patch(`/leave/update/${body.leaveId}`, body);
  return data;
};

export const fetchLeaveById = async (leaveId: string | undefined) => {
  console.log('req leaveId', leaveId);
  const data = await axios.get(`/leaves/${leaveId}`);
  console.log('req Data', data);
  return data;
};

interface DeleteLeave {
  leaveId: string;
}
export const deleteLeave = async (body: DeleteLeave) => {
  const data = await axios.delete(`/leaves/${body.leaveId}`);
  console.log('leaveid', body.leaveId);
  return data;
};

interface UpdateLeaveStatus {
  leaveId: string;
  status: string;
}
export const updateLeaveStatus = async (body: UpdateLeaveStatus) => {
  const responsePromise = await axios.patch(
    `/leave/update/status/${body.leaveId}`,
    {
      status: body.status,
    }
  );
  return responsePromise?.data;
};
