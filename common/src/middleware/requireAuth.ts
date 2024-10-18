import { NextFunction, Request, Response } from 'express'
import { notAuthorizedError } from '../errors/not-authenticate'

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser) {
        throw new notAuthorizedError()
    }
    next()
}
