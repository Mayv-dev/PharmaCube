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
