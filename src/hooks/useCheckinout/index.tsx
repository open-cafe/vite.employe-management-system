import { useQuery } from '@tanstack/react-query';
import { fetchCheckInOut } from './request';

const useCheckInOut = (page: number, pageSize: number) => {
  const {
    isSuccess,
    data,
    isLoading: checkinoutLoading,
  } = useQuery(['checkinout', page, pageSize], () =>
    fetchCheckInOut(page, pageSize)
  );

  return { isSuccess, data, checkinoutLoading };
};
export default useCheckInOut;
