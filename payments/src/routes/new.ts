import {
    BadRequestError,
    notAuthorizedError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from '@synez-ankur/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/orders';
import { stripe } from '../stripe';
import { Payment } from '../models/payments';
import { PaymentCreatedPublisher } from '../events/publisher/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
    '/api/payments/new',
    requireAuth,
    [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
    validateRequest,
    async (req: Request, res: Response) => {
        const { token, orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            throw new NotFoundError();
        }
        if (order.userId !== req.currentUser!.id) {
            throw new notAuthorizedError();
        }
        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError('Cannot pay for an cancelled order');
        }

        // console.log('Order:', order, token);
        const customer = await stripe.customers.create({
            email: req.currentUser!.email,
            source: token,
            name: req.currentUser!.email.split('@')[0],
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        });

        // console.log('Customer:', customer);
        const charge = await stripe.charges.create({
            amount: order.price * 100,
            description: 'Payment for order',
            currency: 'usd',
            statement_descriptor: 'Payment for order',
            customer: customer.id,
            // Put address here
        });

        const payment = Payment.build({
            orderId,
            stripeId: charge.id,
        });
        await payment.save();

        new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId,
        });
        res.status(201).send({
            success: true,
            chargeId: charge.id,
            id: payment.id,
        });
    }
);

export { router as newPaymentRouter };
