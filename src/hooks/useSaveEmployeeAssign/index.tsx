import { useMutation } from '@tanstack/react-query';
import { saveEmployeeAssign } from './request';

const useSaveEmployeeAssign = () => {
  const { mutate: saveEmployeeAction, isLoading: saveEmployeeLoading } =
    useMutation({
      mutationFn: (body: { projectId: string; employeeId: string[] }) =>
        saveEmployeeAssign(body),
    });
  return { saveEmployeeAction, saveEmployeeLoading };
};

export default useSaveEmployeeAssign;
