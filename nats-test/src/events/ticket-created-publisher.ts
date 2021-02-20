import { Publisher } from './base-publisher'
import { TickeCreatedEvent } from './ticket-created-event'
import { Subject } from './subjects'

export class TicketCreatedPublisher extends Publisher<TickeCreatedEvent>{
    readonly subject = Subject.TicketCreated
}