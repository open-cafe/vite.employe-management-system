import { useMutation } from '@tanstack/react-query';
import { addLeave } from './result';
import { Dayjs } from 'dayjs';

const useAddLeave = () => {
  const { mutate: addLeaveAction, isLoading: addLeaveLoading } = useMutation({
    mutationFn: (body: {
      leaveType: string;
      reason: string;
      startDate: Dayjs;
      endDate: Dayjs;
    }) => addLeave(body),
  });
  return { addLeaveAction, addLeaveLoading };
};

export default useAddLeave;
