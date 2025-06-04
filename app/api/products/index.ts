import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/app/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM products');
      res.status(200).json(result.rows);
    } else if (req.method === 'POST') {
      const { name, price, image, description, category, stock } = req.body;
      const result = await pool.query(
        'INSERT INTO products (name, price, image, description, category, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, price, image, description, category, stock]
      );
      res.status(201).json(result.rows[0]);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error connecting to database' });
  }
}
