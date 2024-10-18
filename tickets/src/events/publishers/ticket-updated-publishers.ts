import { Publisher, Subjects, TicketUpdatedEvent } from '@synez-ankur/common';
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
