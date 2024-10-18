import { NextFunction, Request, Response } from 'express';
interface reqWithCurrentUser extends Request {
    currentUser?: userPayload;
}
interface userPayload {
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: userPayload;
        }
    }
}
export declare const currentUser: (req: reqWithCurrentUser, res: Response, next: NextFunction) => void;
export {};
