/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import { Reservation } from '../entities'
import { NoReservationsFound } from '../exceptions'
import { ReservationRepository } from '../repository'

export class FindAvalibleReservation {
    private readonly _reservationRepository: ReservationRepository

    constructor (reservationRepository: ReservationRepository) {
        this._reservationRepository = reservationRepository
    }

    async run(): Promise<Reservation[]> {
        const foundReservations = await this._reservationRepository.getAll()

        if (foundReservations.length === 0) {
            throw new NoReservationsFound()
        }

        const avalibleRe = foundReservations.filter(r => r.avalibleReservations._value === true)

        return avalibleRe
    }
}
