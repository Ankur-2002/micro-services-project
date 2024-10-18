import mongoose from 'mongoose';
import { app } from '../../app';
import { signin } from './helpers/signin';
import request from 'supertest';
import { Order } from '../../models/orders';
import { OrderStatus } from '@synez-ankur/common';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payments';

it('returns a 404 when purchasing an order that does not exist', async () => {
    await request(app)
        .post('/api/payments/new')
        .set('Cookie', signin())
        .send({
            token: 'asdasd',
            orderId: new mongoose.Types.ObjectId().toHexString(),
        })
        .expect(404);
});

it('returns a 401 when purchasing an order that does not belong to the user', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const cookie = signin(userId);
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Create,
    });
    await order.save();
    await request(app)
        .post('/api/payments/new')
        .set('Cookie', signin())
        .send({
            token: 'asdasd',
            orderId: order.id,
        })
        .expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const cookie = signin(userId);
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Cancelled,
    });
    await order.save();

    await request(app)
        .post('/api/payments/new')
        .set('Cookie', cookie)
        .send({
            token: 'asdasd',
            orderId: order.id,
        })
        .expect(400);
});

it('returns a 204 with valid inputs', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const cookie = signin(userId);
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Create,
    });
    await order.save();

    const charge = await request(app)
        .post('/api/payments/new')
        .set('Cookie', cookie)
        .send({
            token: 'tok_visa',
            orderId: order.id,
        })
        .expect(201);

    const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
    expect(chargeOptions.source).toEqual('tok_visa');
    expect(chargeOptions.amount).toEqual(20 * 100);
    expect(chargeOptions.currency).toEqual('usd');
    expect(stripe.charges.create).toHaveBeenCalled();

    const payment = await Payment.findOne({
        orderId: order.id,
        stripeId: charge.body.chargeId,
    });

    expect(payment).not.toBeNull();
});
