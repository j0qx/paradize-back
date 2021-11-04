import dotenv from 'dotenv';
import pg from 'pg';

const { Client } = pg;
dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_BASE,
  port: process.env.DB_PORT,
});

client.connect();

export default client;
