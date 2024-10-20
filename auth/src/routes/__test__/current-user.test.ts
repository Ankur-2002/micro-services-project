import request from 'supertest';
import { app } from '../../app';
import { signin } from './helpers/signin';

it('respond with details about the current user', async () => {
    const { cookie, email } = await signin();
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie!)
        .expect(200);
    expect(response.body.currentUser.email).toEqual(email);
});

it('respond with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .expect(200);
    expect(response.body.currentUser).toEqual(null);
});
