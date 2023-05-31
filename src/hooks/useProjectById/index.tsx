import { useQuery } from '@tanstack/react-query';
import { fetchProjectById } from './request';

const useProjectById = (projectId: string) => {
  const {
    isSuccess: projectByIdSuccess,
    data: projectByIdData,
    isLoading: projectByIdLoading,
    isError: projectByIdError,
  } = useQuery(['projectById', projectId], () => fetchProjectById(projectId));
  return {
    projectByIdSuccess,
    projectByIdData,
    projectByIdLoading,
    projectByIdError,
  };
};

export default useProjectById;
