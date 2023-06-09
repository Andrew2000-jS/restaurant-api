import { NextFunction, Request, Response } from 'express'
import { reservationCreator, reservationDeleter, reservationUpdater } from '../dependency-injection'
import { ApiResponse } from '../../../../@types'
import reservationFinder from '../dependency-injection/reservationFinder'

export const reserveCtr = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { body } = req

    const data = {
        date: new Date(body.date),
        hour: body.hour,
        status: body.status,
        count: body.count,
        user: body.user
    }

    try {
        await reservationCreator.run(data)
        const response: ApiResponse<typeof data> = {
            code: 201,
            success: true,
            message: 'Reservation created!',
            data
          }

          return res.status(201).json(response)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const updateReserveCtr = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params
    const { body } = req

    const data = {
        date: new Date(body.date),
        hour: body.hour,
        status: body.status,
        count: body.count,
        user: body.user
    }

    try {
        await reservationUpdater.run(id, data)

        const response: ApiResponse<typeof data> = {
            code: 200,
            success: true,
            message: 'Reservation updated!',
            data
          }

          return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteReserveCtr = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params
    try {
        await reservationDeleter.run(id)

        const response: ApiResponse<typeof req.body> = {
            code: 204,
            success: true,
            message: 'Reservation deleted!',
            data: id
          }

          return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const reservationFinderCtr = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const orders = await reservationFinder.run()
      return res.status(200).json(orders)
    } catch (error) {
      next(error)
      console.log(error)
    }
}
