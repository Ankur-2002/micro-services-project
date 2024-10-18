import {
    BadRequestError,
    NotFoundError,
    notAuthorizedError,
    requireAuth,
    validateRequest,
} from '@synez-ankur/common';
import express, { Response, Request } from 'express';
import { body, param } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/tickets';
import { natsWrapper } from '../nats-wrapper';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publishers';
const router = express.Router();

router.put(
    '/api/tickets/:ticketId',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0 }),
        param('ticketId').notEmpty().withMessage('Ticket ID is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const ticketId = req.params.ticketId;

        if (!mongoose.Types.ObjectId.isValid(ticketId))
            throw new NotFoundError();

        const ticketDetails = await Ticket.findById(ticketId);

        if (!ticketDetails) {
            throw new NotFoundError();
        }

        if (ticketDetails.userId !== req.currentUser?.id) {
            throw new notAuthorizedError();
        }

        if (ticketDetails.orderId) {
            throw new BadRequestError('Cannot edit a reserved ticket');
        }

        ticketDetails.title = req.body.title;
        ticketDetails.price = req.body.price;

        await ticketDetails.save();
        await new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticketDetails.id,
            title: ticketDetails.title,
            price: ticketDetails.price,
            userId: ticketDetails.userId,
            version: ticketDetails.version,
        });

        return res.status(200).send(ticketDetails);
    }
);
export default router;
