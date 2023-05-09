import { useQuery } from '@tanstack/react-query';
import { fetchTag } from './request';

const useTag = () => {
  const {
    isSuccess,
    data,
    isLoading: projectLoading,
  } = useQuery(['tag'], fetchTag);
  return { isSuccess, data, projectLoading };
};

export default useTag;
