import { useQuery } from '@tanstack/react-query';
import { fetchLeave } from './request';

const useLeave = () => {
  const {
    isSuccess,
    data,
    isLoading: leaveLoading,
  } = useQuery(['leaves'], fetchLeave);
  return { isSuccess, data, leaveLoading };
};

export default useLeave;
