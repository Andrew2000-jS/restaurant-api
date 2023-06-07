import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../@types'

const ERROR_HANDLERS: { [key: string]: any } = {
  PasswordNotMatchException: (res: Response): void => {
    const response: ApiError = {
      code: 400,
      message: 'Password does not match!',
      details:
        'The password you entered does not match the password in the database.'
    }
    res.status(400).json(response)
  },

  UserAlreadyExistException: (res: Response): void => {
    const response: ApiError = {
      code: 400,
      message: 'User Already exist',
      details:
        'The user you are trying to create already exists in the database.'
    }
    res.status(400).json(response)
  },

  CiException: (res: Response): void => {
    const response: ApiError = {
      code: 400,
      message: 'The provided ci is not valid!',
      details:
        'The ci you entered is not valid.'
    }
    res.status(400).json(response)
  },

  UserNotFoundException: (res: Response): any => {
    const response: ApiError = {
      code: 404,
      message: 'User not found!',
      details: 'The user you requested could not be found'
    }
    return res.status(404).json(response)
  },

  HourFormatException: (res: any): void => {
    const response: ApiError = {
      code: 400,
      message: 'Invalid hour!',
      details:
        'The provided hour format is not valid!'
    }
    res.status(400).json(response)
  },

  PeopleCountExepction: (res: any): void => {
    const response: ApiError = {
      code: 400,
      message: 'Invalid people count!',
      details:
        'The provided people count is not valid!'
    }
    res.status(400).json(response)
  },

  AvalibleReservationException: (res: any): void => {
    const response: ApiError = {
      code: 400,
      message: 'Invalid reservation!',
      details:
        'The provided reservation is not valid!'
    }
    res.status(400).json(response)
  },

  NoReservationsFound: (res: any): void => {
    const response: ApiError = {
      code: 404,
      message: 'No resevation found!',
      details:
        'The provided reservation is not exist!'
    }
    res.status(404).json(response)
  },

  RangeError: (res: any): void => {
    const response: ApiError = {
      code: 400,
      message: 'Invalid date!',
      details:
        'The provided date is not valid!'
    }
    res.status(400).json(response)
  },

  defaultError: (res: any, error: any): void => {
    console.log(error)
    const response: ApiError = {
        code: 500,
        message: 'Something was wrong!',
        details: 'An unexpected error occurred while processing your request.'
      }
    res.status(500).json(response).end()
  }
}

export default (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const errorName = error.constructor.name
  const handler = ERROR_HANDLERS[errorName] || ERROR_HANDLERS.defaultError
  handler(res, error)
}
