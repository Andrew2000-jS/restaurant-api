import type { ApiError, ApiResponse } from "../models"

interface IPost {
    data: any
    token?: string
}

export const URL = 'http://localhost:8080/api'

export const postMethod = async ({data, token}: IPost): Promise<ApiResponse<any> | ApiError> => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  
        },
        body: JSON.stringify(data)
    }

    const req = await fetch(`${URL}/reservation/reserve`, opt)
    const res = await req.json()
    return res
}