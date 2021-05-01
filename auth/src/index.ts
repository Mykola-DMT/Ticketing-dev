import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
    console.log('Starting up...')
    if (!process.env.jwt_key) {
        throw new Error('JWT must be defined')
    }
    if (!process.env.MONGO_URI) {
        throw new Error('Mongo_URI must be defined')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to mongoDb');

    } catch (err) {
        console.log(err)
    }

    app.listen(3000, () => {
        console.log('Listening(Auth) on 3000...');
    })
}

start()