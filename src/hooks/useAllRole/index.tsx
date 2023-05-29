import { useQuery } from '@tanstack/react-query';
import { fetchAllRole } from './request';

const useAllRole = () => {
  const {
    data: roleData,
    isError: roleError,
    isSuccess: roleSuccess,
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ['allEmployee'],
    queryFn: () => fetchAllRole(),
    retry: false,
  });

  return {
    roleData,
    roleLoading,
    roleSuccess,
    roleError,
  };
};

export default useAllRole;
