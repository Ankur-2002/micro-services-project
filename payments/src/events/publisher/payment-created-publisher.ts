import { PaymentCreatedEvent, Publisher, Subjects } from '@synez-ankur/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
