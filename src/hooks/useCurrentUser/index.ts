import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUser } from './request';

const useCurrentUser = () => {
  const queryClient = useQueryClient();

  const {
    isError: currentUserError,
    data: currentUserData,
    isLoading: currentUserLoading,
  } = useQuery(['currentUser'], fetchCurrentUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data);
    },
  });

  return { currentUserError, currentUserData, currentUserLoading };
};

export default useCurrentUser;
