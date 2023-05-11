import { useQuery } from '@tanstack/react-query';
import { fetchProject } from './request';

const useProject = (page: number, limit: number) => {
  const {
    isSuccess,
    data,
    isLoading: projectLoading,
  } = useQuery(['project', page, limit], () => fetchProject(page, limit));
  return { isSuccess, data, projectLoading };
};

export default useProject;
