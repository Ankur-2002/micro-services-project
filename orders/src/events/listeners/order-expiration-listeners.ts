import {
    Listener,
    OrderExprationEvent,
    OrderStatus,
    Subjects,
} from '@synez-ankur/common';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';

export class OrderExpirationListener extends Listener<OrderExprationEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = 'orders-service';

    async onMessage(data: OrderExprationEvent['data'], msg: any) {
        const order = await Order.findById(data.orderId).populate('ticket');

        if (!order) {
            throw new Error('Order not found');
        }
        if (order.status === OrderStatus.Complete) {
            return msg.ack();
        }
        order.set({
            status: OrderStatus.Cancelled,
        });

        await order.save();

        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id,
                price: order.ticket.price,
            },
        });

        msg.ack();
    }
}
