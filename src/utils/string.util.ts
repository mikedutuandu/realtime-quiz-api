import { customAlphabet } from 'nanoid';

export const generateRandomString = (length: number): string => {
  let token = '';
  const tokenLength = length || 32;
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < tokenLength; i++) token += possible.charAt(Math.floor(Math.random() * possible.length));
  return token;
};

export const generateId = (length = 10): string => {
  const nanoid = customAlphabet('1234567890', length);
  let uuid = nanoid();
  while (uuid[0] === '0') {
    uuid = nanoid();
  }
  return uuid;
};

export const generateUserIdWithPrefix = (maxLength: number, prefix = 'U'): string => {
  const userId = generateId(maxLength);
  return `${prefix}${userId}`;
};
