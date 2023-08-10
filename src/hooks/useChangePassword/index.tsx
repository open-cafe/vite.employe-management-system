import { useMutation } from '@tanstack/react-query';
import { ChangePassword } from './request';

const useChangePassword = () => {
  const { mutate: passwordChangeAction, isLoading: passwordchangeLoading } =
    useMutation({
      mutationFn: (body: { oldPassword: string; newPassword: string }) =>
        ChangePassword(body),
    });
  return { passwordChangeAction, passwordchangeLoading };
};

export default useChangePassword;
