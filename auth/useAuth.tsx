import { useToast } from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '../axiosInstance/index';
import { User } from '../types/types';

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, nickname: string, password: string) => Promise<void>;
  signout: () => void;
}

type UserResponse = { user: User };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuth(): UseAuth {
  const toast = useToast();
  async function authServerCall(
    urlEndpoint: string,
    email: string,
    nickname: string | undefined,
    password: string,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> = await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: { email, nickname, password },
        headers: { 'Content-Type': 'application/json' },
      });

      if (status === 400) {
        console.log('인증실패');
        return;
      }
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
      console.log(data);
    } catch (errorResponse) {
      // 에러처리
      console.log(errorResponse);
    }
  }
  async function signin(email: string, password: string): Promise<void> {
    authServerCall('/api/users/login', email, undefined, password);
    // todo: 반환된 로그인정보(nickname)으로 로그인상태 업데이트 해주는 함수 작성
  }
  async function signup(email: string, nickname: string, password: string): Promise<void> {
    console.log('signup called');

    authServerCall('/api/users', email, nickname, password);
  }
  function signout(): void {
    //todo: 로그인user정보를 정리해주는(삭제) 함수 clearUser() 작성
  }
  return {
    signin,
    signup,
    signout,
  };
}
