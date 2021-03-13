import { Subjects, Publisher, OrderCancelledEvent } from '@mdticketss/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled
}