import { useQuery } from '@tanstack/react-query';
import { fetchCheckInOut } from './request';

const useCheckInOut = () => {
  const {
    isSuccess,
    data,
    isLoading: checkinoutLoading,
  } = useQuery(['checkinout'], fetchCheckInOut);

  return { isSuccess, data, checkinoutLoading };
};

export default useCheckInOut;
