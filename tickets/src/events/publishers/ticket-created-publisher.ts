import { Publisher, Subjects, TicketCreatedEvent } from '@mdticketss/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated
}