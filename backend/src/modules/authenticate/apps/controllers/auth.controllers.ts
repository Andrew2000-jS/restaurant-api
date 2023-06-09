import { NextFunction, Request, Response } from 'express'
import {
  userCreator,
  userDeleter,
  userLogger,
  userUpdater,
  findByCi
} from '../dependency-injection'
import { ApiResponse } from '../../../../@types'
import { createToken } from '../../../../shared/middlewares'

export const signupCtr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { body } = req

  const data = {
    ci: body.ci,
    birthdate: new Date(body.birthdate),
    name: body.name,
    lastname: body.lastName,
    email: body.email,
    phone: body.phone,
    address: body.address,
    password: body.password
  }

  const forResponse = {
    ci: body.ci,
    birthdate: new Date(body.birthdate),
    name: body.name,
    lastname: body.lastName,
    email: body.email,
    phone: body.phone,
    address: body.address
  }

  try {
    await userCreator.run(data)

    const response: ApiResponse<typeof forResponse> = {
      code: 201,
      success: true,
      message: 'User created!',
      data: forResponse
    }

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const loginCtr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { ci, password } = req.body

  try {
    await userLogger.run(ci, password)
    const token = createToken({
      ci,
      role: 'user'
    })

    const response: ApiResponse<typeof req.body> = {
      code: 200,
      success: true,
      message: 'Successfully logged in!',
      token,
      data: ci
    }

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteCtr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params

  try {
    await userDeleter.run(id)

    const response: ApiResponse<typeof req.body> = {
      code: 204,
      success: true,
      message: 'User deleted!',
      data: id
    }

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const updateCtr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params
  const { ci, name, lastname, address, email, phone, password, birthdate } =
    req.body

  const data = {
    ci,
    name,
    lastname,
    address,
    email,
    phone,
    password,
    birthdate
  }

  const forResponse = {
    ci,
    name,
    lastname,
    address,
    email,
    phone,
    birthdate
  }

  try {
    await userUpdater.run(id, data)

    const response: ApiResponse<typeof forResponse> = {
      code: 200,
      success: true,
      message: 'User updated!',
      data: forResponse
    }

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const findCiCtr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { ci } = req.params

  try {
    const foundUser = await findByCi.run(Number(ci))
    return res.status(200).json(foundUser)
  } catch (error) {
    next(error)
  }
}
