import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from './request';

const useEmployee = () => {
  const {
    isSuccess,
    data,
    isLoading: employeeLoading,
  } = useQuery(['employees'], fetchEmployees);
  return { isSuccess, data, employeeLoading };
};

export default useEmployee;
