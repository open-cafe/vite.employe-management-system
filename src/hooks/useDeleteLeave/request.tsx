import axios from '@/config/axios';
interface DeleteLeave {
  leaveId: string;
}

export const deleteLeave = async (body: DeleteLeave) => {
  const data = await axios.delete(`/leaves/${body.leaveId}`);
  console.log('leaveid', body.leaveId);
  return data;
};
