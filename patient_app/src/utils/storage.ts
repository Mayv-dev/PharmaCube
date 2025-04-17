import { Preferences } from '@capacitor/preferences';
import bcrypt from 'bcryptjs';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  [key: string]: string; // Add index signature for dynamic properties
}

interface AuthToken {
  token: string;
  expiresAt: number;
}

// Initialize preferences
Preferences.configure({
  group: 'com.pharmacube.app'
});

export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  } catch (error) {
    console.error('Error setting item:', error);
    throw error;
  }
};

export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await Preferences.remove({ key });
  } catch (error) {
    console.error('Error removing item:', error);
    throw error;
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData: UserData = {
      id: Date.now().toString(),
      email: username,
      firstName: '',
      lastName: '',
    };
    await setItem(`user_${username}`, { ...userData, password: hashedPassword });
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

export const verifyUser = async (username: string, password: string) => {
  try {
    const userData = await getItem<{ password: string }>(`user_${username}`);
    if (!userData) return false;
    return await bcrypt.compare(password, userData.password);
  } catch (error) {
    console.error('Error verifying user:', error);
    return false;
  }
};

export const setAuthToken = async (token: string, expiresIn: number = 3600): Promise<void> => {
  const authToken: AuthToken = {
    token,
    expiresAt: Date.now() + expiresIn * 1000,
  };
  await setItem('auth_token', authToken);
};

export const getAuthToken = async (): Promise<string | null> => {
  const authToken = await getItem<AuthToken>('auth_token');
  if (!authToken) return null;
  if (Date.now() > authToken.expiresAt) {
    await removeItem('auth_token');
    return null;
  }
  return authToken.token;
};

export const setUserData = async (userData: UserData): Promise<void> => {
  await setItem('user_data', userData);
};

export const getUserData = async (): Promise<UserData | null> => {
  return await getItem<UserData>('user_data');
};

export const clearAuth = async (): Promise<void> => {
  await Promise.all([
    removeItem('auth_token'),
    removeItem('user_data'),
  ]);
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAuthToken();
  return !!token;
};
