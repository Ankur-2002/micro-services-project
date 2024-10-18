import {
    BadRequestError,
    NotFoundError,
    validateRequest,
} from '@synez-ankur/common';
import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { Ticket } from '../models/tickets';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
    '/api/tickets/:ticketId',
    [
        param('ticketId')
            .not()
            .isEmpty()
            .withMessage('ticketId is not defined in the params'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const ticketId = req.params.ticketId;

        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            throw new NotFoundError();
        }
        const ticketDetails = await Ticket.findById(ticketId);

        if (!ticketDetails) {
            throw new NotFoundError()
        }
        res.status(200).send(ticketDetails);
    }
);

export default router;
