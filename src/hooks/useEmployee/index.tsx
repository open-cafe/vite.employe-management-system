import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from './request';

const useEmployee = (page: number, pageSize: number) => {
  const {
    isSuccess,
    data,
    isLoading: employeeLoading,
  } = useQuery(['employees', page, pageSize], () =>
    fetchEmployees(page, pageSize)
  );

  return { isSuccess, data, employeeLoading };
};

export default useEmployee;
