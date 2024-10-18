import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest, BadRequestError } from '@synez-ankur/common'
import { User } from '../models/User'
import { Password } from '../services/password'
import { sign } from 'jsonwebtoken'

const router = express.Router()

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ max: 20, min: 4 })
            .withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body
        console.log(email, password)
        const existUser = await User.findOne({ email });
        console.log(existUser)
        if (!existUser) {
            throw new BadRequestError('Invalid Credentails ')
        }
        const passMatch = await Password.compare(existUser.password, password)
        if (!passMatch) {
            throw new BadRequestError('Invalid Credentails ')
        }

        const userJwt = sign(
            {
                id: existUser.id,
                email: existUser.email,
            },
            'asdf'
        )

        req.session = {
            jwt: userJwt,
        }

        return res.status(200).send(existUser)
    }
)

export { router as signInRoutes }
