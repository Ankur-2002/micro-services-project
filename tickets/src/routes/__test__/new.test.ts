import request from 'supertest';
import { app } from '../../app';
import { signin } from './helpers/signin';
import { Ticket } from '../../models/tickets';
import { natsWrapper } from '../../nats-wrapper';

it('Has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).not.toEqual(404);
});
it('Can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/tickets').send({});
    expect(401);
});

it('returns a status other 401 if the user is signed in', async () => {
    const cookie = signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({});

    expect(response.status).not.toEqual(401);
});
it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .send({
            title: '',
            price: 12,
        })
        .set('Cookie', signin())
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .send({
            price: 12,
        })
        .set('Cookie', signin())
        .expect(400);
});
it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .send({
            title: 'asdfkhaklsdf',
            price: -12,
        })
        .set('Cookie', signin())
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .send({
            title: 'asdfkajysdf',
        })
        .set('Cookie', signin())
        .expect(400);
});
it('creates a ticket with valid inputs', async () => {
    let Tickets = await Ticket.find({});
    expect(Tickets.length).toEqual(0);
    await request(app)
        .post('/api/tickets')
        .send({
            title: 'New Ticket',
            price: 200,
        })
        .set('Cookie', signin())
        .expect(201);
    Tickets = await Ticket.find({});
    expect(Tickets.length).toEqual(1);
    expect(Tickets[0].price).toEqual(200);
    expect(Tickets[0].title).toEqual('New Ticket');
});

it('Publishes the event', async () => {
    await request(app)
        .post('/api/tickets')
        .send({
            title: 'New Ticket',
            price: 200,
        })
        .set('Cookie', signin())
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
