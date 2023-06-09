import axios from '@/config/axios';
import { Dayjs } from 'dayjs';
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
