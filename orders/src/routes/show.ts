import {
    NotFoundError,
    notAuthorizedError,
    requireAuth,
    validateRequest,
} from '@synez-ankur/common';
import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/order';

const Router = express.Router();

Router.get(
    '/api/orders/:orderId',
    requireAuth,
    [
        param('orderId')
            .notEmpty()
            .custom((input: string) => {
                return mongoose.Types.ObjectId.isValid(input);
            })
            .withMessage('OrderId is not defined'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { orderId } = req.params;

        const userOrder = await Order.findById(orderId).populate('ticket');

        if (!userOrder) throw new NotFoundError();

        if (userOrder!.userId !== req.currentUser!.id)
            throw new notAuthorizedError();

        res.send(userOrder);
    }
);

export { Router as showOrderRouter };
