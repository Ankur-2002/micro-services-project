import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
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
        natsWrapper.client.on('close', () => {
            process.exit();
        });
        new OrderCreatedListener(natsWrapper.client).listen();
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
    } catch (error) {
        console.log(error);
    }
};

start();
