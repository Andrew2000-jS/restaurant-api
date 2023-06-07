import type { IRegister, ApiError, ApiResponse } from "../../models";
import { URL } from "../config";

export const registerService = async (data: IRegister): Promise<ApiResponse<any> | ApiError> => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    const req = await fetch(`${URL}/signup`, opt)
    const res = await req.json()
    return res
}