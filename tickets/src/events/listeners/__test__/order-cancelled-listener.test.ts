import {
    orderCancelledEvent,
    orderCreatedEvent,
    OrderStatus,
    Subjects,
} from '@synez-ankur/common';
import { Ticket } from '../../../models/tickets';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-lisenter';
import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
    const OrderCancelledlistener = new OrderCancelledListener(
        natsWrapper.client
    );
    const ticket = Ticket.build({
        title: 'ANKUR',
        price: 123,
        userId: 'ankur',
    });
    ticket.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
    await ticket.save();
    const orderFakeData: orderCancelledEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        ticket: {
            id: ticket.id,
            price: ticket.price,
        },
    };
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return {
        OrderCancelledlistener,
        ticket,
        orderFakeData,
        msg,
    };
};

it('Should set the orderId of the ticket', async () => {
    const { OrderCancelledlistener, orderFakeData, ticket, msg } =
        await setup();
    await OrderCancelledlistener.onMessage(orderFakeData, msg);

    const updatedTicket = await Ticket.findById(ticket.id);
    expect(updatedTicket!.orderId).toEqual(undefined);
});

it('Should ack the message', async () => {
    const { OrderCancelledlistener, orderFakeData, msg } = await setup();
    await OrderCancelledlistener.onMessage(orderFakeData, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('Should publish a ticket updated event', async () => {
    const { OrderCancelledlistener, orderFakeData, msg } = await setup();
    await OrderCancelledlistener.onMessage(orderFakeData, msg);
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
