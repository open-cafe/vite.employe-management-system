import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addProjectDesignationByAssignment,
  deleteProjectDesignationByAssignment,
  fetchProjectDesignationByAssignmemt,
} from './request';

interface IProjectDesignationByAssignmentProps {
  projectAssignmentId?: string;
}

const useProjectDesignationByAssignment = ({
  projectAssignmentId,
}: IProjectDesignationByAssignmentProps = {}) => {
  const {
    isSuccess: projectDesignationSuccess,
    data: projectDesignationData,
    isLoading: projectDesignationLoading,
    isError: projectDesignationError,
  } = useQuery({
    queryKey: ['project-designation', projectAssignmentId],
    queryFn: () =>
      fetchProjectDesignationByAssignmemt(projectAssignmentId as string),
    enabled: !!projectAssignmentId,
  });

  const {
    mutate: deleteProjectDesignationByAssignmentAction,
    isLoading: deleteProjectDesignationByAssignmentLoading,
  } = useMutation({
    mutationFn: (body: { projectDesignationId: string }) =>
      deleteProjectDesignationByAssignment(body),
  });

  const {
    mutate: addProjectDesignationByAssignmentAction,
    isLoading: addProjectDesignationByAssignmentLoading,
  } = useMutation({
    mutationFn: (body: { projectAssignmentId: string; tagId: string }) =>
      addProjectDesignationByAssignment(body),
  });

  return {
    projectDesignationSuccess,
    projectDesignationData,
    projectDesignationLoading,
    projectDesignationError,
    deleteProjectDesignationByAssignmentAction,
    deleteProjectDesignationByAssignmentLoading,
    addProjectDesignationByAssignmentAction,
    addProjectDesignationByAssignmentLoading,
  };
};

export default useProjectDesignationByAssignment;
