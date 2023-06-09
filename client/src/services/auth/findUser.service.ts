import type { ApiError, ApiResponse } from "../../models";
import { URL } from "../config";

export const findUserByCiService = async (ci: string): Promise<ApiResponse<any> | ApiError> => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const req = await fetch(`${URL}/user/${ci}`, opt)
    const res = await req.json()
    return res
}