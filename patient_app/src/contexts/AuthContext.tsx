import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getAuthToken,
  getUserData,
  clearAuth,
  setAuthToken,
  setUserData,
} from '../utils/storage';
import ApiService from '../utils/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getAuthToken();
        if (token) {
          const userData = await getUserData();
          if (userData) {
            setUser(userData);
          } else {
            // If we have a token but no user data, fetch the user profile
            const profile = await ApiService.getUserProfile();
            await setUserData(profile);
            setUser(profile);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        await clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await ApiService.login(email, password);
      await setAuthToken(response.token);
      await setUserData(response.user);
      setUser(response.user);
      history.push('/main');
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    try {
      const response = await ApiService.register(userData);
      await setAuthToken(response.token);
      await setUserData(response.user);
      setUser(response.user);
      history.push('/main');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await clearAuth();
      setUser(null);
      history.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const updatedUser = await ApiService.updateUserProfile(userData);
      await setUserData(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await ApiService.changePassword(currentPassword, newPassword);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 