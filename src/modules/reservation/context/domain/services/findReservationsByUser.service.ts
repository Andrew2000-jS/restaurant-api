/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import { Reservation } from '../entities'
import { NoReservationsFound } from '../exceptions'
import { ReservationRepository } from '../repository'

export class FindReservationByUser {
    private readonly _reservationRepository: ReservationRepository

    constructor (reservationRepository: ReservationRepository) {
        this._reservationRepository = reservationRepository
    }

    async run(userId: string): Promise<Reservation[]> {
        const foundReservations = await this._reservationRepository.getByUser(userId)

        if (foundReservations.length === 0) {
            throw new NoReservationsFound()
        }

        return foundReservations
    }
}
