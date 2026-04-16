import dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL || 'https://petstore.swagger.io/',
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  apiKey: process.env.API_KEY || '',
  isCI: !!process.env.CI,
};
