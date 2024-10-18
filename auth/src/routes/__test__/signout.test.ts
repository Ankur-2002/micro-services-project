import request from 'supertest';
import { app } from '../../app';

it('clears the cookies after signin out', async () => {
    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
