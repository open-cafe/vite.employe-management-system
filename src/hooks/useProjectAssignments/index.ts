import { useQuery } from '@tanstack/react-query';
import { fetchProject } from './request';

const useProjectAssignments = (
  projectId: string,
  page: number,
  limit: number
) => {
  const {
    isSuccess: projectAssignmentSuccess,
    data: projectAssignmentData,
    isLoading: projectAssignmentLoading,
    isError: projectAssignmentError,
  } = useQuery(['project-assignment', page, limit], () =>
    fetchProject(projectId, page, limit)
  );
  return {
    projectAssignmentData,
    projectAssignmentLoading,
    projectAssignmentError,
    projectAssignmentSuccess,
  };
};

export default useProjectAssignments;
