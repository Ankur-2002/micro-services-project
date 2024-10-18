import request from 'supertest';
import { app } from '../../app';
import { signin } from './helpers/signin';

const createTicket = async () => {
    return request(app).post('/api/tickets').set('Cookie', signin()).send({
        title: 'ankurnkaur',
        price: 232,
    });
};
it('Can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app).get('/api/tickets').send().expect(200);

    expect(response.body.length).toEqual(3);
});
