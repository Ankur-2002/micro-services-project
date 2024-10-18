import { Listener, Subjects, TicketCreatedEvent } from '@synez-ankur/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { ticketCreatedListener } from './queue-group-names';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

    queueGroupName: string = ticketCreatedListener;

    async onMessage(
        data: { id: string; title: string; price: number; userId: string },
        msg: Message
    ) {
        const { title, price } = data;
        const ticket = Ticket.build({
            title,
            price,
            id: data.id,
        });
        await ticket.save();

        msg.ack();
    }
}
