import {CustomError} from '../errors/custom-error'

export class DatabaseConnectionError extends CustomError{
    reason = 'Error connectind to database'
    statusCode = 500
    
    constructor(){
        super('Error connecting to db')

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}