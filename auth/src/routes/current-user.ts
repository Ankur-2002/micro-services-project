import express, { Request, Response } from 'express';
import { currentUser } from '@synez-ankur/common';
import { requireAuth } from '@synez-ankur/common';

const router = express.Router();

router.get(
    '/api/users/currentuser',
    currentUser,
    // requireAuth,
    async (req: Request, res: Response) => {
        return res.send({ currentUser: req.currentUser || null });
    }
);

export { router as currentUserRoutes };
