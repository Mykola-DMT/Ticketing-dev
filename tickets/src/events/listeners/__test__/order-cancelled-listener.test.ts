import { natsWrapper } from '../../../nats-wrapper'
import { OrderCancelledListener } from '../order-cancelled-listener'
import { Ticket } from '../../../models/ticket'
import { OrderCancelledEvent } from '@mdticketss/common'
import mongoose from 'mongoose'

const setup = async () => {
    //create instece of the listener
    const listener = new OrderCancelledListener(natsWrapper.client)

    const orderId = mongoose.Types.ObjectId().toHexString()
    //create and save the ticket 
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'kafjhak'
    })
    ticket.set({ orderId })
    await ticket.save()

    //create the fake data event
    const data: OrderCancelledEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        ticket: {
            id: ticket.id
        }
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, orderId, ticket, data, msg }
}

it('updates the ticket, publishes an event, and acks the message', async () => {
    const { msg, data, ticket, orderId, listener } = await setup()

    await listener.onMessage(data, msg)
    const updatedTicket = await Ticket.findById(ticket.id)
    expect(updatedTicket!.orderId).not.toBeDefined()
    expect(msg.ack).toHaveBeenCalled()
    expect(natsWrapper.client.publish).toHaveBeenCalled()
})