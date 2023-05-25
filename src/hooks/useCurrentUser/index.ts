import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from './request';

const useCurrentUser = () => {
  const {
    isError: currentUserError,
    data,
    isLoading: currentUserLoading,
  } = useQuery(['currentUser'], fetchCurrentUser);

  return { currentUserError, data, currentUserLoading };
};

export default useCurrentUser;
