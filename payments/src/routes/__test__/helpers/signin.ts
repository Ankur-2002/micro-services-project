import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
export const signin = (userId?: string): string[] => {
    const email = 'testing@test.com';
    const id = userId ?? new mongoose.Types.ObjectId().toHexString();

    const token = jwt.sign(
        {
            id,
            email,
        },
        'asdf'
    );

    const session = {
        jwt: token,
    };

    const sessionJson = JSON.stringify(session);
    const base64 = Buffer.from(sessionJson).toString('base64');

    return [`session=${base64}`];
};
