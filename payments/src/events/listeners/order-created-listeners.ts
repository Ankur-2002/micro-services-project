import { Listener, orderCreatedEvent, Subjects } from '@synez-ankur/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/orders';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<orderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: orderCreatedEvent['data'], msg: Message) {
        console.log('Event data', data);

        const order = Order.build({
            id: data.id,
            price: data.ticket.price,
            status: data.status,
            userId: data.userId,
            version: data.version,
        });
        await order.save();
        msg.ack();
    }
}
