import request from 'supertest';
import { signin } from './helpers/signin';
import { CreateNewTicket } from './index.test';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('Cancelled an order', async () => {
    const user = signin();
    const ticket = await CreateNewTicket();

    const { body: newOrder } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    const { body: cancelOrder } = await request(app)
        .delete('/api/orders/' + newOrder.id)
        .set('Cookie', user)
        .expect(204);
});

it('returns an error when you one user tries to cancel another user order', async () => {
    const user = signin();
    const user2 = signin();
    const ticket = await CreateNewTicket();

    const { body: newOrder } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    const { body: cancelOrder } = await request(app)
        .delete('/api/orders/' + newOrder.id)
        .set('Cookie', user2)
        .expect(401);
});

it('emits an event after cancel an order', async () => {
    const user = signin();
    const ticket = await CreateNewTicket();

    const { body: newOrder } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    const { body: cancelOrder } = await request(app)
        .delete('/api/orders/' + newOrder.id)
        .set('Cookie', user)
        .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
