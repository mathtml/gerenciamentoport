import mysql from 'mysql2/promise';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
};

const pool = mysql.createPool(dbConfig);

export default pool;
