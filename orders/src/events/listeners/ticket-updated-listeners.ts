import { Listener, Subjects, TicketUpdatedEvent } from '@synez-ankur/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { ticketUpdatedListener } from './queue-group-names';

export class TicketUpdatedListeners extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

    queueGroupName: string = ticketUpdatedListener;

    async onMessage(
        data: {
            id: string;
            title: string;
            price: number;
            userId: string;
            version: number;
        },
        msg: Message
    ) {
        const { title, price } = data;
        const ticket = await Ticket.findByEvent(data);
        if (!ticket) throw new Error('Ticket not found');

        ticket.set({
            title,
            price,
        });
        await ticket.save();

        msg.ack();
    }
}
