import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
interface MockProviderProps {
  component: React.ReactNode;
  schema?: any;
}
export const QueryClientMockProvider = ({ component }: MockProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};
