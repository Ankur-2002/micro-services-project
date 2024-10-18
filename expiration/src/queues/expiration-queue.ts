import Queue from 'bull';
import { OrderExpirationPublisher } from '../events/publisher/order-expiration-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
    orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

expirationQueue.process(async (job) => {
    console.log(
        'Publishing an expiration:complete event for orderId',
        job.data.orderId
    );
    await new OrderExpirationPublisher(natsWrapper.client).publish({
        orderId: job.data.orderId,
    });
});

export { expirationQueue };
