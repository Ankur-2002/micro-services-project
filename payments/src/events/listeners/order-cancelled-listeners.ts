import {
    Listener,
    orderCancelledEvent,
    OrderStatus,
    Subjects,
} from '@synez-ankur/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/orders';

export class OrderCancelledListener extends Listener<orderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: orderCancelledEvent['data'], msg: Message) {
        const order = await Order.findByEvent(data);

        if (!order) {
            throw new Error('Order not found');
        }

        order.set({ status: OrderStatus.Cancelled });
        await order.save();

        msg.ack();
    }
}
