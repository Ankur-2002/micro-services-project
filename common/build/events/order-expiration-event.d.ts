import { Subjects } from './subjects';
export interface OrderExprationEvent {
    subject: Subjects.ExpirationComplete;
    data: {
        orderId: string;
    };
}
