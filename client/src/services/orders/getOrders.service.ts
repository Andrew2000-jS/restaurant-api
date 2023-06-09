import { URL } from "../config";

export const getOrdersService = async (): Promise<any> => {
    const req = await fetch(`${URL}/orders`)
    const res = await req.json()
    return res
}