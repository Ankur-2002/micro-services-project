import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedListeners } from '../ticket-updated-listeners';
import { TicketUpdatedEvent } from '@synez-ankur/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
    const listener = new TicketUpdatedListeners(natsWrapper.client);

    const ticket = Ticket.build({
        title: 'Ankur_Concert',
        price: 100,
        id: new mongoose.Types.ObjectId().toHexString(),
    });

    await ticket.save();

    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        price: 1231,
        title: 'New Concert',
        userId: 'asdfasdf',
        version: ticket.version + 1,
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return {
        msg,
        data,
        ticket,
        listener,
    };
};

it('finds, updates, and saves a ticket', async () => {
    const { listener, ticket, msg, data } = await setup();

    await listener.onMessage(data, msg);

    const findTicket = await Ticket.findById(data.id);

    expect(findTicket).toBeDefined();
    expect(findTicket!.title).toEqual(data.title);
    expect(findTicket!.price).toEqual(data.price);
});

it('acks a message', async () => {
    const { listener, msg, data } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const { msg, data, listener } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (err) {}

    expect(msg.ack).not.toHaveBeenCalled();
});
