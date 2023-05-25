import { useMutation } from '@tanstack/react-query';
import { deleteProjectDesignationByAssignment } from './request';

const useDeleteProjectDesignationByAssignments = () => {
  const {
    mutate: deleteProjectDesignationByAssignmentAction,
    isLoading: deleteProjectDesignationByAssignmentLoading,
  } = useMutation({
    mutationFn: (body: { projectDesignationId: string }) =>
      deleteProjectDesignationByAssignment(body),
  });
  return {
    deleteProjectDesignationByAssignmentAction,
    deleteProjectDesignationByAssignmentLoading,
  };
};

export default useDeleteProjectDesignationByAssignments;
