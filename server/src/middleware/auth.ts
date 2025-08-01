import { Request, Response, NextFunction } from 'express';
import { PrismaClient, UserStatus } from '@prisma/client';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types';

const prisma = new PrismaClient();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user || user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
      return res.status(403).json({ error: 'Access denied: user blocked or deleted' });
    }

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    console.error('Unexpected auth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};