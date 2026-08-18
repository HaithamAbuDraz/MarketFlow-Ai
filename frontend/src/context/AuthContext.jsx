import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { authService } from '@/services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('marketflow_token');
      const storedUser = localStorage.getItem('marketflow_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to parse cached auth state:', e);
      localStorage.removeItem('marketflow_token');
      localStorage.removeItem('marketflow_user');
    } finally {
      setIsLoading(false);
    }

    // Listen for unauthorized 401 events dispatched by API client
    const handleUnauthorized = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.token && response.user) {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('marketflow_token', response.token);
      localStorage.setItem('marketflow_user', JSON.stringify(response.user));
    }
    return response;
  };

  const register = async (storeName, email, password, passwordConfirmation) => {
    const response = await authService.register(storeName, email, password, passwordConfirmation);
    if (response.token && response.user) {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('marketflow_token', response.token);
      localStorage.setItem('marketflow_user', JSON.stringify(response.user));
    }
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setToken(null);
    setUser(null);
  };

  const forgotPassword = async (email) => {
    return await authService.forgotPassword(email);
  };

  const resetPassword = async (token, email, password, passwordConfirmation) => {
    return await authService.resetPassword(token, email, password, passwordConfirmation);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      isSeller: user?.role === 'seller',
      isCustomer: user?.role === 'customer',
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
