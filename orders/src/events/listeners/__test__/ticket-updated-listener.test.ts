import { TicketUpdatedListener } from '../ticket-updated-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { Ticket } from '../../../models/ticket'
import mongoose from 'mongoose'
import { TicketUpdatedEvent } from '@mdticketss/common'
import { Message } from 'node-nats-streaming'

const setup = async () => {
    //Create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client)

    //create and save a ticket
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    })
    await ticket.save()

    //create a fake data obj
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 999,
        userId: 'dfghjk'
    }

    //create a fake msg obj
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    //return all of this stuff
    return { msg, data, ticket, listener }
}

it('finds, upadtes, and saves a ticket', async () => {
    const { msg, data, ticket, listener } = await setup()

    await listener.onMessage(data, msg)

    const upadtedTicket = await Ticket.findById(ticket.id)

    expect(upadtedTicket.title).toEqual(data.title)
    expect(upadtedTicket.price).toEqual(data.price)
    expect(upadtedTicket.version).toEqual(data.version)
})

it('acks the message', async () => {
    const { msg, data, ticket, listener } = await setup()

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})

it('does not call ack if the event has a skipped version', async () => {
    const { msg, data, ticket, listener } = await setup()

    data.version = 10

    try {
        await listener.onMessage(data, msg)
    } catch (err) { }

    expect(msg.ack).not.toHaveBeenCalled()
})