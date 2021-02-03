import {ValidationError} from 'express-validator'
import {CustomError} from '../errors/custom-error'

export class RequstValidayionError extends CustomError{
    statusCode = 400

    constructor(public errors: ValidationError[]){
        super('Invalid request params')

        // Only because we are extending a bult in class 
        Object.setPrototypeOf(this, RequstValidayionError.prototype)
    }

    serializeErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.param}
        })
    }
}
