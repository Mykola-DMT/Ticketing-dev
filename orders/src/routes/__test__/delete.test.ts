import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import { Order, OrderStatus } from '../../models/order'

it('marksan order as cencelled', async () => {
    //create a ticket 
    const ticket = Ticket.build({
        title: 'concert',
        price: 10
    })
    await ticket.save()

    const user = global.signin()
    //make a request to create an order
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201)

    //make a request to cancell the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204)

    //expectation to make sure that thing is cancelled
    const updatedOrder = await Order.findById(order.id)

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it.todo('emits a order cancelled event')