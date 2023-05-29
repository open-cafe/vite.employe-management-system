import { useQuery } from '@tanstack/react-query';
import { fetchAllRole } from './request';

const useAllRole = () => {
  const { data: allRoleData, isLoading: allRoleDataLoading } = useQuery({
    queryKey: ['allEmployee'],
    queryFn: () => fetchAllRole(),
    retry: false,
  });

  return {
    allRoleData,
    allRoleDataLoading,
  };
};

export default useAllRole;
