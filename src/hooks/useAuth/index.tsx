import { useMutation } from '@tanstack/react-query';
import { loginUser } from './request';

const useAuth = () => {
  const { mutate: loginAction, isLoading: loginLoading } = useMutation({
    mutationFn: (body: { email: string; password: string }) => loginUser(body),
  });
  return { loginAction, loginLoading };
};

export default useAuth;
