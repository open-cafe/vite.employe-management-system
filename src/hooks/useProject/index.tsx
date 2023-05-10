import { useQuery } from '@tanstack/react-query';
import { fetchProject } from './request';

const useProject = () => {
  const {
    isSuccess,
    data,
    isLoading: projectLoading,
  } = useQuery(['project'], fetchProject);
  return { isSuccess, data, projectLoading };
};

export default useProject;
