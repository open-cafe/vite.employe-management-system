import React, { createContext, useState } from 'react';
import { setCookie, getCookie, deleteCookie } from '../utils/authCookies';
import { LayoutProps } from '../utils/themeWrapper';
import { cookieName } from '@/constants/environment';

export const AuthContext = createContext({
  token: ('' as string) || null,
  setAuthToken: (newToken: string) => {},
  clearAuthToken: () => {},
});

export const AuthProvider = ({ children }: LayoutProps) => {
  const [token, setToken] = useState(getCookie(cookieName) || null);

  const setAuthToken = (newToken: string) => {
    setCookie(cookieName, newToken);
    setToken(newToken);
  };

  const clearAuthToken = () => {
    deleteCookie(cookieName);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
