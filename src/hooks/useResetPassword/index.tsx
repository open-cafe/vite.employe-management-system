import { useMutation } from '@tanstack/react-query';
import { resetPassword } from './request';

const useResetPassword = () => {
  const {
    mutate: resetPasswordChangeAction,
    isLoading: resetPasswordchangeLoading,
  } = useMutation({
    mutationFn: (body: { password: string; token: string }) =>
      resetPassword(body),
  });
  return { resetPasswordChangeAction, resetPasswordchangeLoading };
};

export default useResetPassword;
