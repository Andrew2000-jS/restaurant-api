import { Reservation } from '../entities'

export interface ReservationRepository {
    create: (reservation: Reservation) => Promise<Reservation>
    update: (id: string, reservation: Reservation) => Promise<Reservation>
    delete: (id: string) => Promise<void>
    getById: (id: string) => Promise<Reservation | null>
    getAll: () => Promise<Reservation[]>
}
