import {
  Reservation,
  FindReservationById,
  ReservationAvalible,
  ReservationHour,
  ReservationPeopleCount,
  ReservationUser,
  ReservationRepository
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

  async run(id: string, reservationData: Reservation): Promise<Reservation> {
    const foundReservation = await this._findReservationById.run(id)

    const newReservation: Reservation = new Reservation({
      date: reservationData.date ?? foundReservation.date,
      hour: new ReservationHour(reservationData.hour._value) ?? foundReservation.hour,
      avalibleReservations:
        new ReservationAvalible(reservationData.avalibleReservations._value) ??
        foundReservation.avalibleReservations,
      peopleCount: new ReservationPeopleCount(reservationData.peopleCount._value) ?? foundReservation.peopleCount,
      user: new ReservationUser(reservationData.user._value) ?? foundReservation.user
    })

    await this._reservationRepository.update(id, newReservation)

    return newReservation
  }
}
