import {Request, Response, NextFunction} from 'express'
import { validationResult} from 'express-validator'
import { RequstValidayionError } from '../errors/request-validation-error'

export const validationRequest = (req:Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        throw new RequstValidayionError(errors.array())
    }

    next()
}