import { Subjects, Publisher, ExpirationCompleteEvent } from '@mdticketss/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete
}