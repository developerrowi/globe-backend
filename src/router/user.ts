// user.router.ts
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import jwt from 'jsonwebtoken';
import secureMiddleware from '../middleware/token.middleware'; // adjust the path as needed

import {
  signupUser,
  loginUser,
  getUserById,
} from '../services/user.service';

const router = express.Router();


// POST /signup
router.post('/users/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    console.log("Someone registering here:  ", email)
    const token = await signupUser(email, password, name);
    res.json({ token });
  } catch (err: any) {
    console.log(err.message)
    res.status(400).json({ error: err.message });
  }
});

// POST /login
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (err: any) {
    console.log(err.message)

    res.status(400).json({ error: err.message });
  }
});

// GET /me
router.get('/users/me', secureMiddleware, async (req: any, res: any) => {
  if (!req.user_id) return res.status(401).json({ error: 'Unauthorized' });

  const user = await getUserById(req.user_id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(user); // ✅ no return here
});


export default router;
