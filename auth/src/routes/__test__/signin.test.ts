import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'ankurchaurasia@gmail.com',
            password: 'asdfasdf',
        })
        .expect(400);
});

it('fails when incorrected password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ankurchaurasia29@gmail.com',
            password: 'asdfasdf',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'ankurchaurasia29@gmail.com',
            password: 'fdasfdas',
        })
        .expect(400);
});

it('responds with cookies when send correct credentails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'ankurchaurasia29@gmail.com',
            password: 'asdfasdf',
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'ankurchaurasia29@gmail.com',
            password: 'asdfasdf',
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
