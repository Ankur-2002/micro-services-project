import { Listener, orderCancelledEvent, Subjects } from '@synez-ankur/common';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publishers';
import { Ticket } from '../../models/tickets';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<orderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: orderCancelledEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        ticket.set({
            orderId: undefined,
        });
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            userId: ticket.userId,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version,
        });
        msg.ack();
    }
}
