import {
    NotFoundError,
    OrderStatus,
    notAuthorizedError,
    requireAuth,
    validateRequest,
} from '@synez-ankur/common';
import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const Router = express.Router();

Router.delete(
    '/api/orders/:orderId',
    requireAuth,
    [
        param('orderId')
            .notEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input)),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate('ticket');

        if (!order) throw new NotFoundError();

        if (order.userId !== req.currentUser?.id)
            throw new notAuthorizedError();

        order.status = OrderStatus.Cancelled;
        await order.save();
        await new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id,
                price: order.ticket.price,
            },
        });
        return res.status(204).send(order);
    }
);

export { Router as deleteOrderRouter };
