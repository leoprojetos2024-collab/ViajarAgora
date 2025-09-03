import pkg from 'pg'
const { Pool } = pkg
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PG_SSL === "true" ? {
    rejectUnauthorized: process.env.PG_SSL_REJECT_UNAUTHORIZED === "true"
  } : false
});

export default pool;