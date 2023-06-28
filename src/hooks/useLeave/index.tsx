import { useQuery } from '@tanstack/react-query';
import { fetchLeave } from './request';

const useLeave = (page: number, pageSize: number) => {
  const {
    isError: leaveError,
    data: leaveData,
    isLoading: leaveLoading,
  } = useQuery(['leaves', page, pageSize], () => fetchLeave(page, pageSize));
  return { leaveError, leaveData, leaveLoading };
};

export default useLeave;
