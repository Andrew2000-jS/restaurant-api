import type { IReservation, ApiError, ApiResponse, IOrder } from "../../models";
import { URL } from "../config";
import { findItem } from "../../static/ts/localStorage";

const isExistToken = findItem('token')
let token: any;

if (isExistToken) {
    token = localStorage.getItem('token')
} else {
    token = ""
}

export const orderNewService = async (data: IOrder): Promise<ApiResponse<any> | ApiError> => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token)}`
        },
        body: JSON.stringify(data)
    }

    const req = await fetch(`${URL}/order/new`, opt)
    const res = await req.json()
    return res
}