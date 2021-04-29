import { Subjects, Publisher, PaymentCreatedEvent } from '@mdticketss/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated
}
