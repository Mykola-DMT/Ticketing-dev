import { OrderCreatedListener } from '../order-created-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { OrderStatus, OrderCreatedEvent } from '@mdticketss/common'
import { Ticket } from '../../../models/ticket'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'

const setup = async () => {
    //create instece of the listener
    const listener = new OrderCreatedListener(natsWrapper.client)

    //create and save the ticket 
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'kafjhak'
    })
    await ticket.save()

    //create the fake data event
    const data: OrderCreatedEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: 'asdfg',
        expiresAt: 'asdfg',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, ticket, data, msg }
}

it('sets the userId of the ticket', async () => {
    const { listener, ticket, data, msg } = await setup()

    await listener.onMessage(data, msg)

    const updatedTicket = await Ticket.findById(ticket.id)

    expect(updatedTicket!.orderId).toEqual(data.id)
})

it('acks the message', async () => {
    const { listener, ticket, data, msg } = await setup()
    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})

it('publishes a ticket updated event', async () => {
    const { listener, ticket, data, msg } = await setup()

    await listener.onMessage(data, msg)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
})