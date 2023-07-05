import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addLeave,
  deleteLeave,
  fetchLeave,
  fetchLeaveById,
  updateLeave,
  updateLeaveStatus,
} from './request';
import { Dayjs } from 'dayjs';

interface LeaveProps {
  leaveId?: string;
  page?: number;
  rowsPerPage?: number;
}
const useLeave = ({ leaveId, page, rowsPerPage }: LeaveProps = {}) => {
  const {
    isError: leaveError,
    data: leaveData,
    isLoading: leaveLoading,
  } = useQuery({
    queryKey: ['leaves', page, rowsPerPage],
    queryFn: () => fetchLeave(page as number, rowsPerPage as number),
    enabled: !!page && !!rowsPerPage,
  });

  const { mutate: addLeaveAction, isLoading: addLeaveLoading } = useMutation({
    mutationFn: (body: {
      leaveType: string;
      reason: string;
      startDate: Dayjs;
      endDate: Dayjs;
    }) => addLeave(body),
  });

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

  const {
    isSuccess: leaveByIdSuccess,
    data: leaveByIdData,
    isLoading: leaveByIdLoading,
    isError: leaveByIdError,
  } = useQuery({
    queryKey: ['leaveById', leaveId],
    queryFn: () => fetchLeaveById(leaveId as string),
    enabled: !!leaveId,
  });

  const { mutate: deleteLeaveAction, isLoading: deleteLeaveLoading } =
    useMutation({
      mutationFn: (body: { leaveId: string }) => deleteLeave(body),
    });

  const {
    mutate: updateLeaveStatusAction,
    isLoading: updateLeaveStatusLoading,
  } = useMutation({
    mutationFn: (body: { leaveId: string; status: string }) =>
      updateLeaveStatus(body),
  });

  return {
    leaveError,
    leaveData,
    leaveLoading,
    addLeaveAction,
    addLeaveLoading,
    updateLeaveAction,
    updateLeaveLoading,
    leaveByIdSuccess,
    leaveByIdData,
    leaveByIdLoading,
    leaveByIdError,
    deleteLeaveAction,
    deleteLeaveLoading,
    updateLeaveStatusAction,
    updateLeaveStatusLoading,
  };
};

export default useLeave;
