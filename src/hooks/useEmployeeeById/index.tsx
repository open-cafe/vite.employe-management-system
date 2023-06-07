import { useQuery } from '@tanstack/react-query';
import { fetchEmployeeById } from './request';

const useEmployeeById = () => {
  const {
    isSuccess: employeeByIdSuccess,
    data: employeeByIdData,
    isLoading: employeeByIdLoading,
    isError: employeeByIdError,
  } = useQuery(['employeeById'], () => fetchEmployeeById());
  return {
    employeeByIdSuccess,
    employeeByIdData,
    employeeByIdLoading,
    employeeByIdError,
  };
};

export default useEmployeeById;
