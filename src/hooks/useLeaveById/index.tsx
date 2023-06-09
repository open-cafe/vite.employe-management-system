import { useQuery } from '@tanstack/react-query';
import { fetchLeaveById } from './request';

const useLeaveById = (leaveId: string) => {
  const {
    isSuccess: leaveByIdSuccess,
    data: leaveByIdData,
    isLoading: leaveByIdLoading,
    isError: leaveByIdError,
  } = useQuery(['LeaveById', leaveId], () => fetchLeaveById(leaveId));
  return {
    leaveByIdSuccess,
    leaveByIdData,
    leaveByIdLoading,
    leaveByIdError,
  };
};

export default useLeaveById;
