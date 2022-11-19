// user를 가져오는 getUser 함수

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@typings/types';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '@utils/userStorage';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../axiosInstance/index';
import { queryKeys } from '../react-query/constants';

async function getUser(
  user: User | null,
  signal: AbortSignal | undefined,
): Promise<User | null> {
  if (!user) return null;
  console.log('getUser');

  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    '/api/users',
    {
      signal,
    },
  );

  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}
export function useUser(): UseUser {
  const queryClient = useQueryClient();
  const { data: user } = useQuery<User>(
    [queryKeys.user],
    ({ signal }) => getUser(user, signal),
    {
      initialData: getStoredUser,
      onSuccess: (received: null | User) => {
        if (!received) {
          console.log('clear');

          clearStoredUser();
        } else {
          console.log('store');
          setStoredUser(received);
        }
      },
    },
  );
  function updateUser(newUser: User): void {
    console.log(newUser);
    queryClient.setQueryData([queryKeys.user], newUser);
  }
  function clearUser() {
    queryClient.setQueryData([queryKeys.user], null);
  }
  return { user, updateUser, clearUser };
}
