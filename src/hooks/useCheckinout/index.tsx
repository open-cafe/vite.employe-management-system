import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addCheckIn,
  fetchCheckInOut,
  fetchLatestCheckIn,
  updateCheckIn,
} from './request';

interface CheckProps {
  page?: number;
  rowsPerPage?: number;
}

const useCheckInOut = ({ page, rowsPerPage }: CheckProps = {}) => {
  const {
    isSuccess: checkInOutSuccess,
    data: checkInOutData,
    isLoading: checkInOutLoading,
  } = useQuery({
    queryKey: ['checkinout', page, rowsPerPage],
    queryFn: () => fetchCheckInOut(page as number, rowsPerPage as number),
    enabled: !!page && !!rowsPerPage,
  });

  const { mutate: addCheckInAction, isLoading: addCheckInLoading } =
    useMutation({
      mutationFn: () => addCheckIn(),
    });

  const {
    isSuccess: latestCheckinSuccess,
    data: latestCheckinData,
    isLoading: latestCheckInLoading,
  } = useQuery({
    queryKey: ['checkinoutlatest'],
    queryFn: () => fetchLatestCheckIn(),
    // enabled: false,
  });

  const { mutate: updateCheckInAction, isLoading: updateCheckInLoading } =
    useMutation({
      mutationFn: () => updateCheckIn(),
    });

  return {
    checkInOutSuccess,
    checkInOutData,
    checkInOutLoading,
    latestCheckinSuccess,
    latestCheckinData,
    latestCheckInLoading,
    addCheckInAction,
    addCheckInLoading,
    updateCheckInAction,
    updateCheckInLoading,
  };
};

export default useCheckInOut;
