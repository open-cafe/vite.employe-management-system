import { useMutation } from '@tanstack/react-query';
import { sendResetPasswordMail } from './request';

const useSendResetEmail = () => {
  const { mutate: emailSendChangeAction, isLoading: emailSendLoading } =
    useMutation({
      mutationFn: (body: { email: string }) => sendResetPasswordMail(body),
    });
  return { emailSendChangeAction, emailSendLoading };
};

export default useSendResetEmail;
