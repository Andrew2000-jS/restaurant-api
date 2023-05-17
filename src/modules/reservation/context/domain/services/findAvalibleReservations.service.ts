/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import { Reservation } from '../entities'
import { NoReservationsFound } from '../exceptions'
import { ReservationRepository } from '../repository'

export class FindAvalibleReservation {
    private readonly _reservationRepository: ReservationRepository

    constructor (reservationRepository: ReservationRepository) {
        this._reservationRepository = reservationRepository
    }

    async run(): Promise<Reservation | any> {
        const foundReservations: Reservation[] = await this._reservationRepository.getAll()

        if (foundReservations.length === 0) return

        const avalibleReservationIndex = foundReservations.findIndex((r) => r.reservationStatus._value === true)

        if (avalibleReservationIndex < 0) {
            throw new NoReservationsFound()
        }

        return foundReservations[avalibleReservationIndex]
    }
}
