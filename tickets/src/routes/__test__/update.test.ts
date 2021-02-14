import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('return a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'aafdcz',
            price: 34
        })
        .expect(404)
})

it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'aafdcz',
            price: 34
        })
        .expect(401)
})

it('return a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'hfjdskla',
            price: 21
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'iewwqe',
            price: 221
        })
        .expect(401)
})

it('return a 400 if the user provided an invslid title or price', async () => {

})

it('updates the ticket provided valid inputs', async () => {

})