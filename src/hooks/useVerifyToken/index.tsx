import { useMutation } from '@tanstack/react-query';
import { verifyToken } from './request';

const useVerifyToken = () => {
  const { mutate: verifyTokenAction, isLoading: verifyTokenLoading } =
    useMutation({
      mutationFn: (body: { userId: string }) => verifyToken(body),
    });
  return { verifyTokenAction, verifyTokenLoading };
};

export default useVerifyToken;
