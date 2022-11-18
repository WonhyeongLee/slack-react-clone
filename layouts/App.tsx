import React, { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
const LogIn = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

// 코드스플리팅 할 때 어떤부분을 하면 좋을지 생각해보자
// 가장쉬운단위 : 페이지들 , 서버에서 렌더링 안된 컴포넌트들
const queryClient = new QueryClient();

export default function App(): ReactElement {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
