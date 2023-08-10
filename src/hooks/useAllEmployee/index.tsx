import { useQuery } from '@tanstack/react-query';
import { fetchAllEmployee } from './request';

const useAllEmployee = () => {
  const { data: allEmployeeData, isLoading: allEmployeeDataLoading } = useQuery(
    {
      queryKey: ['allEmployee'],
      queryFn: () => fetchAllEmployee(),
      retry: false,
    }
  );

  return {
    allEmployeeData,
    allEmployeeDataLoading,
  };
};

export default useAllEmployee;
