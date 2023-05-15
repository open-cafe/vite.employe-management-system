import { useMutation } from '@tanstack/react-query';
import { addProjectAssignment } from './request';

const useAddProjectAssignment = () => {
  const { mutate: addProjectAssignmentAction, isLoading: addProjectLoading } =
    useMutation({
      mutationFn: (body: { projectId: string; employeeId: string }) =>
        addProjectAssignment(body),
    });
  return { addProjectAssignmentAction, addProjectLoading };
};

export default useAddProjectAssignment;
