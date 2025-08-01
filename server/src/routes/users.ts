import { PrismaClient, UserStatus } from '@prisma/client';
import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthenticatedRequest } from '../types';

const prisma = new PrismaClient();
const router = Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('[GET /api/users] Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const targetUserId = req.params.id;
  const requesterUserId = (req as AuthenticatedRequest).user?.id;

  if (!targetUserId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (!requesterUserId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (targetUserId === requesterUserId) {
    return res.status(400).json({ error: 'You cannot delete yourself through this endpoint' });
  }

  try {
    const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (targetUser.status === UserStatus.DELETED) {
      return res.status(400).json({ error: 'User is already deleted' });
    }

    await prisma.user.update({
      where: { id: targetUserId },
      data: { status: UserStatus.DELETED },
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/users/:id] Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.patch('/users/:id/block', authMiddleware, async (req: Request, res: Response) => {
  const targetUserId = req.params.id;
  const requesterUserId = (req as AuthenticatedRequest).user?.id;

  if (targetUserId === requesterUserId) {
    return res.status(400).json({ error: 'You cannot block yourself' });
  }

  try {
    const userToBlock = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!userToBlock) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (userToBlock.status === UserStatus.BLOCKED) {
      return res.status(400).json({ error: 'User is already blocked' });
    }
    if (userToBlock.status === UserStatus.DELETED) {
      return res.status(400).json({ error: 'Cannot block deleted user' });
    }

    await prisma.user.update({
      where: { id: targetUserId },
      data: { status: UserStatus.BLOCKED }
    });

    res.status(200).json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;