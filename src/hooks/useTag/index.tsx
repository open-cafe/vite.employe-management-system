import { useQuery } from '@tanstack/react-query';
import { fetchTag } from './request';

const useTag = () => {
  const {
    isSuccess: istagSuccess,
    data: tagData,
    isLoading: istagLoading,
  } = useQuery(['tag'], fetchTag);
  return { istagSuccess, tagData, istagLoading };
};

export default useTag;
