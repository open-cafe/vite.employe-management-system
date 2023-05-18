import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from './request';

const useEmployee = (page: number, pageSize: number) => {
  const {
    isError: employeeError,
    data,
    isLoading: employeeLoading,
  } = useQuery(['employees', page, pageSize], () =>
    fetchEmployees(page, pageSize)
  );

  return { employeeError, data, employeeLoading };
};

export default useEmployee;
