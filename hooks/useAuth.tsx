import { useToast } from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { axiosInstance } from '../axiosInstance/index';
import { User } from '../types/types';
import { useUser } from './useUser';

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, nickname: string, password: string) => Promise<void>;
  signout: () => void;
}
type ErrorResponse = { message: string };
type AuthResponseType = User | ErrorResponse;

export function useAuth(): UseAuth {
  const toast = useToast();
  const { updateUser, clearUser } = useUser();
  async function authServerCall(
    urlEndpoint: string,
    email?: string,
    nickname?: string,
    password?: string,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: { email, nickname, password },
          headers: { 'Content-Type': 'application/json' },
        });

      if (status === 201) {
        console.log(`가입 성공 `);
        toast({
          isClosable: true,
          title: `회원가입 되었습니다. 로그인해주세요 !`,
          status: 'info',
          variant: 'subtle',
          position: 'top',
        });
      }
      //로그인성공 시
      if ('email' in data) {
        const userData: any = {};
        userData.user = { ...data };
        console.log(userData);
        updateUser(userData);
      }
    } catch (errorResponse) {
      // 에러처리
      console.log('errorResponse log --------------');
      console.log(errorResponse);
      console.log('--------------------------------');

      const title =
        axios.isAxiosError(errorResponse) && errorResponse?.response?.data
          ? errorResponse?.response?.data
          : '서버와 연결이 안됩니다.';
      toast({
        isClosable: true,
        title: title,
        status: 'error',
        variant: 'subtle',
        position: 'top',
      });
    }
  }
  async function signin(email: string, password: string): Promise<void> {
    authServerCall('/api/users/login', email, undefined, password);
    // todo: 반환된 로그인정보(nickname)으로 로그인상태 업데이트 해주는 함수 작성
  }
  async function signup(
    email: string,
    nickname: string,
    password: string,
  ): Promise<void> {
    console.log('signup called');

    authServerCall('/api/users', email, nickname, password);
  }
  const signout = useCallback(() => {
    console.log('signout');
    // authServerCall('api/users/logout');
    clearUser();
  }, []);

  return {
    signin,
    signup,
    signout,
  };
}
