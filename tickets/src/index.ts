import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
import { OrderCreatedListener } from './events/listeners/order-created-lisenter';

const start = async () => {
    if (!process.env.MONGO_URI)
        throw new Error('MONGO_URL not defined in the ENV');
    if (!process.env.NATS_URL)
        throw new Error('NATS URL not defined in the ENV');
    if (!process.env.NATS_CLUSTER_ID)
        throw new Error('NATS CLUSTER ID not defined in the ENV');

    console.log(process.env, 'ENV VARIABLES');
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID!,
            process.env.NATS_URL
        );
        natsWrapper.client.on('close', () => {
            process.exit();
        });
        new OrderCancelledListener(natsWrapper.client).listen();
        new OrderCreatedListener(natsWrapper.client).listen();
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
