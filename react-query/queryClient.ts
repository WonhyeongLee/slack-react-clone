import { useToast } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';

const toast= useToast();
const queryErrorHandler = (error: unknown): void => {
  const title = error instanceof Error ? error.message : '서버 연결 에러';
  toast.closeAll();
  toast({title,status: 'error', variant:'subtle', isClosable:true});
}
export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        onError: queryErrorHandler,
        staleTime: 600000,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        onError: queryErrorHandler,
      }
    }
  })
}
export const queryClient = generateQueryClient();