import { useQuery } from '@tanstack/react-query';
import { fetchProject } from './request';

const useProject = (page: number, limit: number) => {
  const {
    isSuccess: projectSuccess,
    data: projectData,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery(['project', page, limit], () => fetchProject(page, limit));
  return { projectSuccess, projectData, projectLoading, projectError };
};

export default useProject;
