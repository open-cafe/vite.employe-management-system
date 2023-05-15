import { useQuery } from '@tanstack/react-query';
import { fetchAllProject } from './request';

const useAllProject = () => {
  const { data: allProjectData, isLoading: allProjectDataLoading } = useQuery({
    queryKey: ['allProject'],
    queryFn: () => fetchAllProject(),
    retry: false,
  });

  return {
    allProjectData,
    allProjectDataLoading,
  };
};

export default useAllProject;
