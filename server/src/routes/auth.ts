import { Router } from 'express';
import { Prisma, PrismaClient, UserStatus } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { validateBody } from '../middleware/validateBody';
import { registerSchema } from '../middleware/validationSchema';

const prisma = new PrismaClient();
const router = Router();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined");
}
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', validateBody(registerSchema), async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      if (existingUser.status === UserStatus.BLOCKED) {
        return res.status(403).json({ error: 'User is blocked' });
      }
      if (existingUser.status === UserStatus.DELETED) {
        const passwordHash = await bcrypt.hash(password, 10);
        const restoredUser = await prisma.user.update({
          where: { email },
          data: {
            name,
            passwordHash,
            status: UserStatus.ACTIVE
          }
        });
        return res.status(200).json({ id: restoredUser.id, email: restoredUser.email, message: 'User restored' });
      }
      return res.status(409).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash, status: UserStatus.ACTIVE }
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ message: 'Email already registered' });
    }
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});


router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  if (user.status === UserStatus.DELETED) {
    return res.status(403).json({ error: 'User is deleted' });
  }
  if (user.status === UserStatus.BLOCKED) {
    return res.status(403).json({ error: 'User is blocked' });
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Incorrect password' })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() }
  })

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token })

});

export default router;