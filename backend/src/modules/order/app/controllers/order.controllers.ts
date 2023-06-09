import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from '../../../../@types'
import { orderCreator, orderDeleter, orderUpdater } from '../dependency-injection'
import orderFinder from '../dependency-injection/orderFinder'

export const createOrderCtr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { body } = req
  const newOrder = {
    date: body.date,
    total: body.total,
    expired: body.expired,
    idUsers: body.idUsers,
    orders: body.orders
  }

  try {
    await orderCreator.run(newOrder)

    const response: ApiResponse<typeof newOrder> = {
      code: 201,
      success: true,
      message: 'Order created!',
      data: newOrder
    }

    return res.status(200).json(response)
  } catch (error) {
    next(error)
    console.log(error)
  }
}

export const updateOrderCtr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { body } = req
  const { id } = req.params

  const newOrder = {
    date: body.date,
    total: body.total,
    expired: body.expired,
    idUsers: body.idUsers,
    orders: body.orders
  }

  try {
    await orderUpdater.run(Number(id), newOrder)

    const response: ApiResponse<typeof newOrder> = {
      code: 200,
      success: true,
      message: 'Order updated!',
      data: newOrder
    }

    return res.status(200).json(response)
  } catch (error) {
    next(error)
    console.log(error)
  }
}

export const deleterOrderCtr = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params

    try {
      await orderDeleter.run(Number(id))

      const response: ApiResponse<typeof id> = {
        code: 204,
        success: true,
        message: 'Order deleted!',
        data: id
      }

      return res.status(204).json(response)
    } catch (error) {
      next(error)
      console.log(error)
    }
  }

export const orderFinderCtr = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const orders = await orderFinder.run()
    return res.status(200).json(orders)
  } catch (error) {
    next(error)
    console.log(error)
  }
}
