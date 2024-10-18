import { Publisher, Subjects, orderCreatedEvent } from '@synez-ankur/common';

export class orderCreatePublisher extends Publisher<orderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
