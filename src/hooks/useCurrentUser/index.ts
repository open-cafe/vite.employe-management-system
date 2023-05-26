import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUser } from './request';

const useCurrentUser = () => {
  const queryClient = useQueryClient();

  const {
    isError: currentUserError,
    data,
    isLoading: currentUserLoading,
  } = useQuery(['currentUser'], fetchCurrentUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data);
    },
  });

  return { currentUserError, data, currentUserLoading };
};

export default useCurrentUser;
