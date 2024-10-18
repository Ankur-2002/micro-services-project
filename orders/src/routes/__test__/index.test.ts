import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import request from 'supertest';
import { signin } from './helpers/signin';
import mongoose from 'mongoose';
export const CreateNewTicket = async () => {
    const mongoId = new mongoose.Types.ObjectId();
    const ticket = Ticket.build({
        title: 'Ankur1',
        price: 100,
        id: mongoId.toString(),
    });
    await ticket.save();

    return ticket;
};

it('fetches all the users orders', async () => {
    /**
     * 1. Create three tickets
     * 2. Create 2 orders with one ticket and 2 tickets respectively
     * 3. Fetch orders based on users
     */
    const ticket1 = await CreateNewTicket();
    const ticket2 = await CreateNewTicket();
    const ticket3 = await CreateNewTicket();

    const user1 = signin();
    const user2 = signin();

    const { body: order1 } = await request(app)
        .post('/api/orders')
        .set('Cookie', user1)
        .send({
            ticketId: ticket1.id,
        })
        .expect(201);

    const { body: order2 } = await request(app)
        .post('/api/orders')
        .set('Cookie', user2)
        .send({
            ticketId: ticket2.id,
        })
        .expect(201);

    const { body: order3 } = await request(app)
        .post('/api/orders')
        .set('Cookie', user2)
        .send({
            ticketId: ticket3.id,
        })
        .expect(201);

    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', user1)
        .expect(200);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].ticket.id).toEqual(ticket1.id);
    expect(response.body[0].id).toEqual(order1.id);
});
