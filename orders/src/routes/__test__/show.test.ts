import request from 'supertest';
import { signin } from './helpers/signin';
import { CreateNewTicket } from './index.test';
import { app } from '../../app';

it('fetches the order', async () => {
    const user1 = signin();
    const ticket = await CreateNewTicket();

    const { body: orderTicket } = await request(app)
        .post('/api/orders')
        .send({
            ticketId: ticket.id,
        })
        .set('Cookie', user1)
        .expect(201);

    const { body: fetchUserOrder } = await request(app)
        .get('/api/orders/' + orderTicket.id)
        .set('Cookie', user1)
        .expect(200);

    expect(fetchUserOrder.id).toEqual(orderTicket.id);
});

it('returns an error if one user tries to access another user order', async () => {
    const user1 = signin();
    const user2 = signin();
    const ticket = await CreateNewTicket();

    const { body: orderTicket } = await request(app)
        .post('/api/orders')
        .send({
            ticketId: ticket.id,
        })
        .set('Cookie', user1)
        .expect(201);

    const { body: fetchUserOrder } = await request(app)
        .get('/api/orders/' + orderTicket.id)
        .set('Cookie', user2)
        .expect(401);
});
