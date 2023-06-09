import { useMutation } from '@tanstack/react-query';
import { updateLeave } from './request';
import { Dayjs } from 'dayjs';

const useUpdateLeave = () => {
  const { mutate: updateLeaveAction, isLoading: updateLeaveLoading } =
    useMutation({
      mutationFn: (body: {
        leaveId: string;
        leaveType: string;
        reason: string;
        startDate: Dayjs | null;
        endDate: Dayjs | null;
      }) => updateLeave(body),
    });
  return { updateLeaveAction, updateLeaveLoading };
};

export default useUpdateLeave;
