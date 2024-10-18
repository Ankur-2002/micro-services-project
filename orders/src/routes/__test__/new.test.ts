import mongoose from 'mongoose';
import { signin } from './helpers/signin';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order } from '../../models/order';
import { OrderStatus } from '@synez-ankur/common';
import { natsWrapper } from '../../nats-wrapper';

it('returns an error if ticket does not exist', async () => {
    const cookie = signin();
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', cookie)
        .send({ ticketId });
    expect(401);
});

it('returns an error if ticket is already reserved', async () => {
    // Create a new Ticket
    const ticket = Ticket.build({
        price: 100,
        title: 'Ankur is here',
        id: new mongoose.Types.ObjectId().toString(),
    });
    await ticket.save();

    const order = Order.build({
        ticket,
        expireAt: new Date(),
        status: OrderStatus.Create,
        userId: '123123123',
    });

    await order.save();

    await request(app)
        .post('/api/orders')
        .send({
            ticketId: ticket.id,
        })
        .set('Cookie', signin())
        .expect(400);
});

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
        title: 'Ankur',
        price: 1233,
        id: new mongoose.Types.ObjectId().toString(),
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', signin())
        .send({
            ticketId: ticket.id,
        })
        .expect(201);
});

it('Create an event pushed test', async () => {
    const ticket = Ticket.build({
        title: 'Ankur',
        price: 1233,
        id: new mongoose.Types.ObjectId().toString(),
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', signin())
        .send({
            ticketId: ticket.id,
        })
        .expect(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
