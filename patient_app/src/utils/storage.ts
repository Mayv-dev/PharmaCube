import { Storage } from '@ionic/storage';

const storage = new Storage();
storage.create();

export const setItem = async (key: string, value: any) => {
  await storage.set(key, value);
};

export const getItem = async (key: string) => {
  return await storage.get(key);
};

export const removeItem = async (key: string) => {
  await storage.remove(key);
};

export const registerUser = async (username: string, password: string) => {
  const existingUsers = (await getItem('users')) || {};
  existingUsers[username] = password;
  await setItem('users', existingUsers);
};

export const verifyUser = async (username: string, password: string) => {
  const users = (await getItem('users')) || {};
  return users[username] === password;
};
