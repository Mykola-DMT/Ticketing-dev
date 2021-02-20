import { Publisher, Subjects, TicketUpdatedEvent } from '@mdticketss/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated
}