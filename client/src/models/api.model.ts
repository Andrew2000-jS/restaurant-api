export interface ApiResponse<T> {
    code: number
    success: boolean
    message: string
    data?: T
    token?: string
    id?: string | number
    error?: ApiError
  }

export interface ApiError {
    code: number
    message: string
    details?: unknown
    token: any
    id?: any
}