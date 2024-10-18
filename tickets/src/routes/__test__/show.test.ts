import request from 'supertest'
import { app } from '../../app'
import { signin } from './helpers/signin';

it('returns a 404 if the ticket is not found', async () => {
    await request(app)
        .get('/api/tickets/asdfasdfasdf')
        .send()
        .expect(404)
});

it('returns the ticket if the ticket is found', async () => {
    const title = 'concert'
    const price = 200;

    const response = await request(app)
        .post('/api/tickets')
        .send({
            title,
            price
        })
        .set('Cookie', signin())
        .expect(201);

    console.log(response.body
    )
    const ticketResponse = await request(app)
        .get('/api/tickets/' + response.body.id)
        .send().expect(200)
    expect(ticketResponse.body.title).toEqual(title)
    expect(ticketResponse.body.price).toEqual(price)

})