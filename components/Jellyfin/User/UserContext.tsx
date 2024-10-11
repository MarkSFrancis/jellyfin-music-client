import { useAppSelector } from '../../../store';

export const useUserState = () => useAppSelector((state) => state.userState);

export const useUser = () => {
  const user = useUserState();

  if (!user) {
    throw new Error('User is not logged in');
  }

  return user;
};
