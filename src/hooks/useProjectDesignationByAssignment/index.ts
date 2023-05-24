import { useQuery } from '@tanstack/react-query';
import { fetchProjectDesignationByAssignmemt } from './request';

const useProjectDesignationByAssignment = (
  projectAssignmentId: string,
  page: number,
  limit: number
) => {
  const {
    isSuccess: projectDesignationSuccess,
    data: projectDesignationData,
    isLoading: projectDesignationLoading,
    isError: projectDesignationError,
  } = useQuery(['project-designation', projectAssignmentId, page, limit], () =>
    fetchProjectDesignationByAssignmemt(projectAssignmentId, page, limit)
  );
  return {
    projectDesignationSuccess,
    projectDesignationData,
    projectDesignationLoading,
    projectDesignationError,
  };
};

export default useProjectDesignationByAssignment;
