import {
    Listener,
    orderCreatedEvent,
    OrderStatus,
    Subjects,
} from '@synez-ankur/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/tickets';
import { queueGroupName } from './queue-group-name';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publishers';
export class OrderCreatedListener extends Listener<orderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: orderCreatedEvent['data'], msg: Message) {
        // Find the ticket that order is reserving
        // Set the order id to the ticket and save the ticket
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        if (ticket.orderId) {
            throw new Error('Ticket is already reserved');
        }
        ticket.set({
            orderId: data.id,
        });
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket!.orderId,
            userId: ticket.userId,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version,
        });
        msg.ack();
    }
}
