import { Storage } from '@ionic/storage-angular';
import bcrypt from 'bcryptjs';

const storage = new Storage();

const initStorage = async () => {
  await storage.create();
};

initStorage(); // Initialize storage before usage

export const setItem = async (key: string, value: any) => {
  try {
    await storage.set(key, value);
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
  }
};

export const getItem = async (key: string) => {
  try {
    return await storage.get(key);
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await storage.remove(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
  }
};

// Hash and store user
export const registerUser = async (username: string, password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUsers = (await getItem('users')) || {};
    existingUsers[username] = hashedPassword;
    await setItem('users', existingUsers);
  } catch (error) {
    console.error(`Error registering user ${username}:`, error);
  }
};

// Verify user login by comparing hashed password
export const verifyUser = async (username: string, password: string) => {
  try {
    const users = (await getItem('users')) || {};
    if (!users[username]) return false; // User doesn't exist

    const isMatch = await bcrypt.compare(password, users[username]); // Compare hashed password
    return isMatch;
  } catch (error) {
    console.error(`Error verifying user ${username}:`, error);
    return false;
  }
};
