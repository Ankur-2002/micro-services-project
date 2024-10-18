import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface reqWithCurrentUser extends Request {
    currentUser?: userPayload;
}

interface userPayload {
    id: string;
    email: string;
}
// Not able to understand practically.
declare global {
    namespace Express {
        interface Request {
            currentUser?: userPayload;
        }
    }
}

export const currentUser = (
    req: reqWithCurrentUser,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = verify(req.session.jwt, 'asdf') as userPayload;
        req.currentUser = payload;
    } catch (err) {}
    next();
};
