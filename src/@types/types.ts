export interface ApiResponse<T> {
    code: number
    success: boolean
    message: string
    data?: T
    token?: string
    error?: ApiError
  }

export interface ApiError {
    code: number
    message: string
    details?: unknown
}
