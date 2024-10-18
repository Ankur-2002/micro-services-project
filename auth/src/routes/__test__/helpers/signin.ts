import { app } from '../../../app';
import request from 'supertest';
export const signin = async (): Promise<{
    cookie: string[] | undefined;
    email: string;
    password: string;
}> => {
    const email = 'testing@test.com';
    const password = 'testing';
    const authResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password,
        })
        .expect(201);

    const cookie = authResponse.get('Set-Cookie');
    return {
        cookie,
        email,
        password,
    };
};
