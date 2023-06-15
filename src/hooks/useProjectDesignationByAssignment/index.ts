import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addProjectDesignationByAssignment,
  deleteProjectDesignationByAssignment,
  fetchProjectDesignationByAssignmemt,
} from './request';

interface IProjectDesignationByAssignmentProps {
  projectAssignmentId?: string;
  page?: number;
  limit?: number;
}

const useProjectDesignationByAssignment = ({
  projectAssignmentId,
  page,
  limit,
}: IProjectDesignationByAssignmentProps = {}) => {
  const {
    isSuccess: projectDesignationSuccess,
    data: projectDesignationData,
    isLoading: projectDesignationLoading,
    isError: projectDesignationError,
  } = useQuery({
    queryKey: ['project-designation', projectAssignmentId, page, limit],
    queryFn: () =>
      fetchProjectDesignationByAssignmemt(
        projectAssignmentId as string,
        page as number,
        limit as number
      ),
    enabled: !!projectAssignmentId && !!page && !!limit,
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
