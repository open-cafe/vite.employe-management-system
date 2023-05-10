import { useMutation } from '@tanstack/react-query';
import { addUser } from './result';

const useAddUser = () => {
  const { mutate: addUserAction, isLoading: addUserLoading } = useMutation({
    mutationFn: (body: { email: string; roleId: string }) => addUser(body),
  });
  return { addUserAction, addUserLoading };
};

export default useAddUser;
