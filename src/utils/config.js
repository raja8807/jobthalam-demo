import { QueryClient } from '@tanstack/react-query';

const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0, // 30 seconds
      cacheTime: 0, // 30 seconds,
      refetchOnMount: 'always',
      refetchOnWindowFocus: 'always',
      refetchOnReconnect: 'always',
      refetchInterval: 1000 * 300, // 30 seconds
      refetchIntervalInBackground: false,
      suspense: false,
    },
    mutations: {
      retry: 0,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

export default queryClient;
