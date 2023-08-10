import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeWrapper from './utils/themeWrapper';
import AppProvider from './context/sidebar/provider';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
