import { Publisher, Subjects, OrderExprationEvent } from '@synez-ankur/common';

export class OrderExpirationPublisher extends Publisher<OrderExprationEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
