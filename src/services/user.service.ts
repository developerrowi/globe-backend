// user.service.ts
require('dotenv').config()
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function signupUser(email: string, password: string, name: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return generateToken(user);
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  return generateToken(user);
}

export async function getUserById(user_id: string): Promise<any> {
  const user = await prisma.user.findUnique({ where: { id: user_id } });
  if (!user) return null;

  const { id, email, name } = user;
  return { id, email, name };
}

function generateToken(user: any) {
  return jwt.sign({ user_id: user.id }, JWT_SECRET, { expiresIn: '7d' });
}
