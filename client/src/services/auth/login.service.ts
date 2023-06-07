import type { ILogin, ApiError, ApiResponse } from "../../models";
import { URL } from "../config";

export const loginService = async (data: ILogin): Promise<ApiResponse<any> | ApiError> => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    const req = await fetch(`${URL}/login`, opt)
    const res = await req.json()
    return res
}