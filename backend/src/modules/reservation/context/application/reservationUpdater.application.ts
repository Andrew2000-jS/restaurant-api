import {
  Reservation,
  FindReservationById,
  ReservationAvalible,
  ReservationHour,
  ReservationPeopleCount,
  ReservationUser,
  ReservationRepository,
  ReservationPrimitiveData
} from '../domain'

export class ReservationUpdater {
  private readonly _reservationRepository: ReservationRepository
  private readonly _findReservationById: FindReservationById

  constructor(reservationRepository: ReservationRepository) {
    this._reservationRepository = reservationRepository
    this._findReservationById = new FindReservationById(
      this._reservationRepository
    )
  }

  async run(id: string, reservationData: ReservationPrimitiveData): Promise<Reservation> {
    const foundReservation: any = await this._findReservationById.run(id)

    const reservationDate = !isNaN(reservationData.date.getTime()) ? reservationData.date : null

    const newReservation: Reservation = new Reservation({
      date: reservationDate ?? foundReservation.date,
      hour: new ReservationHour(reservationData.hour ?? foundReservation.hour),
      status: new ReservationAvalible(reservationData.status ?? foundReservation.status),
      count: new ReservationPeopleCount(reservationData.count ?? foundReservation.count),
      user: new ReservationUser(reservationData.user ?? foundReservation.idUsers)
    })

    await this._reservationRepository.update(id, newReservation)

    return newReservation
  }
}
