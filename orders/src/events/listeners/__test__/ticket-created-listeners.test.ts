import { TicketCreatedEvent } from '@synez-ankur/common';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketCreatedListener } from '../ticket-created-listeners';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    const Listener = new TicketCreatedListener(natsWrapper.client);

    const data: TicketCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return {
        Listener,
        data,
        msg,
    };
};

it('creates and saves a ticket', async () => {
    const { Listener, data, msg } = await setup();

    await Listener.onMessage(data, msg);

    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket?.title).toEqual(data.title);
});

it('acks the message', async () => {
    const { Listener, data, msg } = await setup();

    await Listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});
