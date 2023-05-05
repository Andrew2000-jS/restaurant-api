declare global {
  namespace Express {
    interface Request {
      authData?: any
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export { ProcessEnv }
