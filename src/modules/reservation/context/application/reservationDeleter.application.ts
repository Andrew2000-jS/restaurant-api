import {
    FindReservationById,
    ReservationRepository
  } from '../domain'

  export class ReservationDeleter {
    private readonly _reservationRepository: ReservationRepository
    private readonly _findReservationById: FindReservationById

    constructor(reservationRepository: ReservationRepository) {
      this._reservationRepository = reservationRepository
      this._findReservationById = new FindReservationById(
        this._reservationRepository
      )
    }

    async run(id: string): Promise<void> {
      await this._findReservationById.run(id)
      await this._reservationRepository.delete(id)
    }
  }
