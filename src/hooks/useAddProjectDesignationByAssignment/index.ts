import { useMutation } from '@tanstack/react-query';
import { addProjectDesignationByAssignment } from './request';

const useAddProjectDesignationByAssignment = () => {
  const {
    mutate: addProjectDesignationByAssignmentAction,
    isLoading: addProjectDesignationByAssignmentLoading,
  } = useMutation({
    mutationFn: (body: { projectAssignmentId: string; tagId: string }) =>
      addProjectDesignationByAssignment(body),
  });
  return {
    addProjectDesignationByAssignmentAction,
    addProjectDesignationByAssignmentLoading,
  };
};

export default useAddProjectDesignationByAssignment;
