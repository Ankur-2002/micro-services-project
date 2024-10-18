import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/listeners/ticket-created-listeners';
import { TicketUpdatedListeners } from './events/listeners/ticket-updated-listeners';
import { OrderExpirationListener } from './events/listeners/order-expiration-listeners';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';

const start = async () => {
    if (!process.env.MONGO_URI)
        throw new Error('MONGO_URL not defined in the ENV');
    if (!process.env.NATS_URL)
        throw new Error('NATS URL not defined in the ENV');
    if (!process.env.NATS_CLUSTER_ID)
        throw new Error('NATS CLUSTER ID not defined in the ENV');
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID!,
            process.env.NATS_URL
        );
        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListeners(natsWrapper.client).listen();
        new OrderExpirationListener(natsWrapper.client).listen();
        new PaymentCreatedListener(natsWrapper.client).listen();
        natsWrapper.client.on('close', () => {
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
        await mongoose.connect(
            // 'mongodb+srv://ankursynez:ankursyneztech@learning.tndytfj.mongodb.net/'
            process.env.MONGO_URI
        );
        console.log('Connected to mongoDB');
    } catch (error) {
        console.log(error);
    }
    app.listen(3000, () => {
        console.log('Tickets application is running on PORT 3000');
    });
};

start();
