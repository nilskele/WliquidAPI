import express from 'express';
import dbService from '../services/dbService.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await dbService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Other CRUD routes for users
export default router;
