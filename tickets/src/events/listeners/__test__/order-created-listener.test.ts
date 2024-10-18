import { orderCreatedEvent, OrderStatus, Subjects } from '@synez-ankur/common';
import { Ticket } from '../../../models/tickets';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-lisenter';
import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);
    const ticket = Ticket.build({
        title: 'ANKUR',
        price: 123,
        userId: 'ankur',
    });
    await ticket.save();
    const orderFakeData: orderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Create,
        userId: 'ankur',
        expiresAt: '123',
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
        listener,
        ticket,
        orderFakeData,
        msg,
    };
};

it('Should set the orderId of the ticket', async () => {
    const { listener, orderFakeData, ticket, msg } = await setup();
    await listener.onMessage(orderFakeData, msg);

    const updatedTicket = await Ticket.findById(ticket.id);
    expect(updatedTicket!.orderId).toEqual(orderFakeData.id);
});

it('Should ack the message', async () => {
    const { listener, orderFakeData, msg } = await setup();
    await listener.onMessage(orderFakeData, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('Should publish a ticket updated event', async () => {
    const { listener, orderFakeData, msg } = await setup();
    await listener.onMessage(orderFakeData, msg);
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
