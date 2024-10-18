import { app } from '../../app';
import request from 'supertest';

it('return 201 after successful signup', async () => {
    request(app)
        .post('/api/users/signup')
        .send({
            email: 'ankurchaurasia29@gmail.com',
            password: 'asdfasdfasdf',
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    request(app)
        .post('/api/users/signup')
        .send({
            email: 'ankurcyharas@gmail.com',
            password: 'asdfasdf',
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    request(app)
        .post('/api/users/signup')
        .send({
            email: 'ankurcyharas@gmail.com',
            password: 'asdf',
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'akur@gmail.com',
        })
        .expect(400);
    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'asdfasdf',
        })
        .expect(400);
});

it('disallow duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'asdfasdfasdf',
            email: 'ankurchaurasia291@gmail.com',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ankurchaurasia291@gmail.com',
            password: 'adsfasdfasdf',
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ankurchaurasia291@gmail.com',
            password: 'adsfasdfasdf',
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});
