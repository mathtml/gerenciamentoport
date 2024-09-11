import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';

const configPath = path.join(__dirname, '../config/config.json');
const configJson = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const config = configJson[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
