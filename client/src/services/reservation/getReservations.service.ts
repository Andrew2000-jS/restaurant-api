import { URL } from "../config";

export const getReservationService = async (): Promise<any> => {
    const req = await fetch(`${URL}/reservations`)
    const res = await req.json()
    return res
}