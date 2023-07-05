import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchProject,
  addProjectAssignment,
  deleteProjectAssignment,
} from './request';

interface IProjectAssignmentsProps {
  projectId?: string;
  page?: number;
  limit?: number;
}

const useProjectAssignments = ({
  projectId,
  page,
  limit,
}: IProjectAssignmentsProps = {}) => {
  const {
    isSuccess: projectAssignmentSuccess,
    data: projectAssignmentData,
    isLoading: projectAssignmentLoading,
    isError: projectAssignmentError,
  } = useQuery({
    queryKey: ['project-assignment', page, limit],
    queryFn: () =>
      fetchProject(projectId as string, page as number, limit as number),
    enabled: !!projectId && !!page && !!limit,
  });

  const { mutate: addProjectAssignmentAction, isLoading: addProjectLoading } =
    useMutation({
      mutationFn: (body: { projectId: string; employeeId: string }) =>
        addProjectAssignment(body),
    });

  const {
    mutate: deleteProjectAssignmentAction,
    isLoading: deleteProjectLoading,
  } = useMutation({
    mutationFn: (body: { projectAssignmentId: string }) =>
      deleteProjectAssignment(body),
  });

  return {
    projectAssignmentData,
    projectAssignmentLoading,
    projectAssignmentError,
    projectAssignmentSuccess,
    addProjectAssignmentAction,
    addProjectLoading,
    deleteProjectAssignmentAction,
    deleteProjectLoading,
  };
};

export default useProjectAssignments;
