import { Reservation } from '../entities'

export interface ReservationRepository {
    create: (reservation: Reservation) => Promise<Reservation>
    update: (reservation: Reservation) => Promise<Reservation>
    delete: (id: string) => Promise<void>
    getById: (id: string) => Promise<Reservation | null>
    getAll: () => Promise<Reservation[]>
    getByUser: (userId: string) => Promise<Reservation[]>
}
