import express, { Request, Response } from 'express';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const fetchTickets = await Ticket.find({
        orderId: undefined,
    });
    res.status(200).send(fetchTickets);
});
export default router;
