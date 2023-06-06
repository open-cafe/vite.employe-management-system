import { useMutation } from '@tanstack/react-query';
import { updateEmployee } from './request';

const useUpdateEmployee = () => {
  const { mutate: updateEmployeeAction, isLoading: updateEmployeeLoading } =
    useMutation({
      mutationFn: (body: {
        name: string;
        designation: string;
        phone: string;
      }) => updateEmployee(body),
    });
  return { updateEmployeeAction, updateEmployeeLoading };
};

export default useUpdateEmployee;
