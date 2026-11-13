import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env para o process.env
dotenv.config();

export const env = {
  PORT: process.env.PORT || 3333,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLINIC_API_KEY: process.env.CLINIC_API_KEY || 'default_secret_key',
};