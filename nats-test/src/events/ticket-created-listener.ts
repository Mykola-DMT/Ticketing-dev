import { Message } from 'node-nats-streaming'
import { TodoComment } from 'typescript'
import { Listener } from './base-listener'
import { TickeCreatedEvent } from './ticket-created-event'
import { Subject } from './subjects'

export class TickeCreatedListener extends Listener<TickeCreatedEvent> {
    readonly subject = Subject.TicketCreated
    queueGroupName = 'payments-service'

    onMessage(data: TickeCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data)

        console.log(data.id)
        console.log(data.title)
        console.log(data.price)

        msg.ack()
    }
}