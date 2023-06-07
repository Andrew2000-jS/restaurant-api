import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError } from '../../@types'

import { config } from 'dotenv'

config({ path: '.env.local' })

interface JwtPayload {
  forToken: [key: string]
}

export const createToken = (payload: string | object): any => {
  const token = jwt.sign(payload, process.env.SECRET_KEY)
  return token
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  try {
    let token = req.get('authorization')
    if (token?.toLowerCase().startsWith('bearer')) {
      token = token.slice(7, token.length)
    }

    if (token) {
      const { forToken } = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload
      req.authData = forToken
      next()
    } else {
      const response: ApiError = {
        code: 401,
        message: 'Access denied',
        details: 'You do not have permission to access this resource.'
      }

      return res.status(401).json(response)
    }
  } catch (error) {
    const response: ApiError = {
      code: 400,
      message: 'Invalid token',
      details: 'The token provided is invalid or has expired.'
    }
    res.status(400).json(response)
  }
}
