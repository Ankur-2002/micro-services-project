import {
    BadRequestError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from '@synez-ankur/common';
import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import { orderCreatePublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const Router = express.Router();
const EXPIRATION_SECONDS = 15 * 60;
Router.post(
    '/api/orders',
    requireAuth,
    [
        body('ticketId')
            .notEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('TicketId must be provided'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { ticketId } = req.body;

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            throw new NotFoundError();
        }

        const isReserved = await ticket.isReserved();

        if (isReserved) {
            throw new BadRequestError('Ticket is already reserved');
        }

        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_SECONDS);

        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Create,
            expireAt: expiration,
            ticket: ticket,
        });
        await order.save();
        console.log(order);
        await new orderCreatePublisher(natsWrapper.client).publish({
            expiresAt: order.expireAt.toISOString(),
            id: order.id,
            status: OrderStatus.Create,
            version: order.version,
            ticket: {
                id: ticket.id,
                price: ticket.price,
            },
            userId: req.currentUser!.id,
        });
        res.status(201).send(order);
    }
);

export { Router as newOrderRouter };
