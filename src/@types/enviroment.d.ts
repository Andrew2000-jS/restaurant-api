export declare global {
  namespace NodeJs {
    interface ProcessEnv {
      DB_HOST_DEV: string
      DB_USER_DEV: string
      DB_PASS_DEV: string
      DB_PORT_DEV: number
      DB_NAME_DEV: string

      SECRET_KEY: string
    }
  }

  namespace Express {
    interface Request {
      authData?: any
    }
  }
}
