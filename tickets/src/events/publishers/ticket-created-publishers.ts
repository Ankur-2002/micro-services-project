import { Publisher, TicketCreatedEvent, Subjects } from '@synez-ankur/common'
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}