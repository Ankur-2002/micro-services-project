import {
    Listener,
    OrderStatus,
    PaymentCreatedEvent,
    Subjects,
} from '@synez-ankur/common';
import { paymentCreatedListener } from './queue-group-names';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = paymentCreatedListener;
    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        order.set({ status: OrderStatus.Complete });
        await order.save();
        msg.ack();
    }
}
