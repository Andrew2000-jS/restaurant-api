import { Reservation, ReservationRepository } from '../domain'

  export class ReservationFinder {
      private readonly _reservationRepository: ReservationRepository

      constructor (reservationRepository: ReservationRepository) {
          this._reservationRepository = reservationRepository
      }

      async run(): Promise<Reservation[]> {
        const foundReservations = await this._reservationRepository.getAll()
        return foundReservations
      }
  }
