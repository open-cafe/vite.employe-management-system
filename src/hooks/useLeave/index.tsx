import { useQuery } from '@tanstack/react-query';
import { fetchLeave } from './request';

const useLeave = (page: number, pageSize: number) => {
  const {
    isSuccess,
    data,
    isLoading: leaveLoading,
  } = useQuery(['leaves', page, pageSize], () => fetchLeave(page, pageSize));
  return { isSuccess, data, leaveLoading };
};

export default useLeave;
