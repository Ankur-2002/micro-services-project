import { orderCreatedEvent, OrderStatus } from '@synez-ankur/common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listeners';
import mongoose from 'mongoose';
import { Order } from '../../../models/orders';

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);
    const data: orderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Create,
        userId: new mongoose.Types.ObjectId().toHexString(),
        expiresAt: '123',
        ticket: {
            id: new mongoose.Types.ObjectId().toHexString(),
            price: 10,
        },
    };
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };
    return { listener, data, msg };
};

it('replicates the order info', async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg);
    const order = await Order.findById(data.id);
    expect(order!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});
