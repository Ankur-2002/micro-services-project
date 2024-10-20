import { requireAuth, validateRequest } from '@synez-ankur/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publishers';
import { natsWrapper } from '../nats-wrapper';

const Router = express.Router();

Router.post(
    '/api/tickets',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, price } = req.body;
        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser?.id || '',
        });

        await ticket.save();
        await new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version,
        });
        return res.status(201).send(ticket);
    }
);

export default Router;
