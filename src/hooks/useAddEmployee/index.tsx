import { useMutation } from '@tanstack/react-query';
import { addEmployee } from './result';

const useAddEmployee = () => {
  const { mutate: addEmployeeAction, isLoading: addEmployeeLoading } =
    useMutation({
      mutationFn: (body: {
        name: string;
        designation: string;
        phone: string;
        // hireDate: string;
      }) => addEmployee(body),
    });
  return { addEmployeeAction, addEmployeeLoading };
};

export default useAddEmployee;
