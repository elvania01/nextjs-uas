import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // pastikan sudah ada .env
  ssl: {
    rejectUnauthorized: false, // untuk koneksi Neon
  },
});

export default pool;
