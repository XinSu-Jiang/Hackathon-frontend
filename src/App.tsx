import { RouterProvider } from 'react-router';
import router from '@/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/lib';
import AppProvider from './providers/AppProvider';
import ToastProvider from './providers/ToastProvider';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
        <ToastProvider />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
