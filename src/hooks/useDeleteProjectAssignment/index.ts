import { useMutation } from '@tanstack/react-query';
import { deleteProjectAssignment } from './request';

const useDeleteProjectAssignments = () => {
  const {
    mutate: deleteProjectAssignmentAction,
    isLoading: deleteProjectLoading,
  } = useMutation({
    mutationFn: (body: { projectAssignmentId: string }) =>
      deleteProjectAssignment(body),
  });
  return { deleteProjectAssignmentAction, deleteProjectLoading };
};

export default useDeleteProjectAssignments;
