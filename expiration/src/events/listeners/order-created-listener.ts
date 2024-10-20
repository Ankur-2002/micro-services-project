import {
    Listener,
    orderCreatedEvent,
    OrderStatus,
    Subjects,
} from '@synez-ankur/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<orderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: orderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log(
            'Waiting this many milliseconds to process the job:',
            delay
        );
        await expirationQueue.add(
            {
                orderId: data.id,
            },
            {
                delay,
            }
        );
        msg.ack();
    }
}
