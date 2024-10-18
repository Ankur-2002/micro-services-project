import request from 'supertest';
import { app } from '../../app';
import { signin } from './helpers/signin';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
import { Ticket } from '../../models/tickets';

it('returns a 404 if the provided id does not exist', async () => {
    const tempId = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put('/api/tickets/' + tempId)
        .set('Cookie', signin())
        .send({
            title: 'asdfasdf',
            price: 23,
        })
        .expect(404);
});
it('returns a 401 if the user is not authenticated', async () => {
    const tempId = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put('/api/tickets/' + tempId)
        .send({
            title: 'asdfasdf',
            price: 23,
        })
        .expect(401);
});
it('returns a 400 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({
            title: 'asdfasdfasdf',
            price: 23,
        })
        .set('Cookie', signin())
        .expect(201);

    await request(app)
        .put('/api/tickets/' + response.body.id)
        .send({
            title: 'asdfasdf',
            price: 100,
        })
        .set('Cookie', signin())
        .expect(401);
});
it('returns a 400 if the user provides an invalid title or price', async () => {
    await request(app)
        .put('/api/tickets/adfasdfasdf')
        .set('Cookie', signin())
        .send({
            title: '',
            price: 100,
        })
        .expect(400);

    await request(app)
        .put('/api/tickets/asdfasdfasdf')
        .set('Cookie', signin())
        .send({
            title: 'asdfasdfasdf',
            price: 0,
        })
        .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
    const title = 'final_testing';
    const price = 100;
    const cookie = signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title,
            price,
        })
        .expect(201);

    const updateResponse = await request(app)
        .put('/api/tickets/' + response.body.id)
        .send({
            title: 'Final_update',
            price: 1000,
        })
        .set('Cookie', cookie)
        .expect(200);

    expect(updateResponse.body.title).toEqual('Final_update');
});

it('Publishes an event', async () => {
    const title = 'final_testing';
    const price = 100;
    const cookie = signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title,
            price,
        })
        .expect(201);

    const updateResponse = await request(app)
        .put('/api/tickets/' + response.body.id)
        .send({
            title: 'Final_update',
            price: 1000,
        })
        .set('Cookie', cookie)
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects updates if the ticket is reserved', async () => {
    const title = 'final_testing';
    const price = 100;
    const cookie = signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title,
            price,
        })
        .expect(201);

    const ticket = await Ticket.findById(response.body.id);
    ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
    await ticket!.save();

    await request(app)
        .put('/api/tickets/' + response.body.id)
        .send({
            title: 'Final_update',
            price: 1000,
        })
        .set('Cookie', cookie)
        .expect(400);
});
