import { useQuery } from '@tanstack/react-query';
import { fetchLeave } from './request';

const useLeave = (page: number, pageSize: number) => {
  const {
    isError: leaveError,
    data,
    isLoading: leaveLoading,
  } = useQuery(['leaves', page, pageSize], () => fetchLeave(page, pageSize));
  return { leaveError, data, leaveLoading };
};

export default useLeave;
