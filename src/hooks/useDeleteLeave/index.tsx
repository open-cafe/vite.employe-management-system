import { useMutation } from '@tanstack/react-query';
import { deleteLeave } from './request';

const useDeleteLeave = () => {
  const { mutate: deleteLeaveAction, isLoading: deleteLeaveLoading } =
    useMutation({
      mutationFn: (body: { leaveId: string }) => deleteLeave(body),
    });

  return { deleteLeaveAction, deleteLeaveLoading };
};

export default useDeleteLeave;
