import mysql from 'mysql2/promise';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const dbConfig = {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
};
const pool = mysql.createPool(dbConfig);
export default pool;
