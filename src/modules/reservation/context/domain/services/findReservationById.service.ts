/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import { Reservation } from '../entities'
import { NoReservationsFound } from '../exceptions'
import { ReservationRepository } from '../repository'

export class FindReservationById {
    private readonly _reservationRepository: ReservationRepository

    constructor (reservationRepository: ReservationRepository) {
        this._reservationRepository = reservationRepository
    }

    async run(id: string): Promise<Reservation> {
        const foundReservation = await this._reservationRepository.getById(id)

        if (!foundReservation) {
            throw new NoReservationsFound()
        }

        return foundReservation
    }
}
