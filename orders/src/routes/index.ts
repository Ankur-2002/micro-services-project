import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../models/order';

const Router = express.Router();

Router.get('/api/orders', async (req: Request, res: Response) => {
    const userOrders = await Order.find({
        userId: req.currentUser!.id,
    }).populate('ticket');

    res.send(userOrders);
});

export { Router as indexOrderRouter };
