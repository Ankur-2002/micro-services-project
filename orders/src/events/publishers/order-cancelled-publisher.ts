import { Publisher, Subjects, orderCancelledEvent } from '@synez-ankur/common';

export class OrderCancelledPublisher extends Publisher<orderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
