import { Subject } from './subjects'

export interface TickeCreatedEvent {
    subject: Subject.TicketCreated
    data: {
        id: string
        title: string
        price: number
    }
}