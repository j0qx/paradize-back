import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const client = new Pool({
  // Heroku nous met à disposition le DATABASE_URL
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // on demande à accepter le fait de ne pas être en ssl
    rejectUnauthorized: false,
  },
});

export default client;