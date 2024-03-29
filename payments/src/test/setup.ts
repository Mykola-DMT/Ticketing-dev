import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'
import jwt from 'jsonwebtoken'

declare global {
    namespace NodeJS {
        interface Global {
            signin(id?: string): string[]
        }
    }
}

jest.mock('../nats-wrapper')

process.env.STRIPE_KEY = 'sk_test_51Ik16KASNiNbDeh0uG5CMZVPh5faBjeQjgQxBRAAh42VZez38u7khffC9xjFSHGteerMABqAw9IOE7EWk8RVYJ4l009Lrv5fpB'

let mongo: any
beforeAll(async () => {
    process.env.jwt_key = 'asdfasdf'

    mongo = new MongoMemoryServer
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

beforeEach(async () => {
    jest.clearAllMocks()
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

global.signin = (id?: string) => {
    //build a JWT payload. {id, email}
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }

    //create the JWT
    const token = jwt.sign(payload, process.env.jwt_key!)

    //build session Object {jwt: my-jwt}
    const session = { jwt: token }

    //turn that session into JSON
    const sessionJSON = JSON.stringify(session)

    //Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64')

    //return a string thats the cookie wiht the encoded data
    return [`express:sess=${base64}`]
}