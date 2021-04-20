import Queue from 'bull'

interface Payload {
    orderId: string

}

const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
})

expirationQueue.process(async (job) => {
    console.log('Iwant t publish an expiration:conmplet event for orderId', job.data.orderId)
})

export { expirationQueue }