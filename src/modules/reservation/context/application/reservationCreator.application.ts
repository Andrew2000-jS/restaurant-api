import {
  Reservation,
  FindAvalibleReservation,
  ReservationAvalible,
  ReservationHour,
  ReservationPeopleCount,
  ReservationUser,
  ReservationRepository
} from '../domain'

export class ReservationCreator {
    private readonly _reservationRepository: ReservationRepository
    private readonly _findAvalibleReservation: FindAvalibleReservation

    constructor (reservationRepository: ReservationRepository) {
        this._reservationRepository = reservationRepository
        this._findAvalibleReservation = new FindAvalibleReservation(this._reservationRepository)
    }

    async run(reservationData: Reservation): Promise<Reservation> {
        await this._findAvalibleReservation.run()

        const newReservation: Reservation = new Reservation({
            date: reservationData.date,
            hour: new ReservationHour(reservationData.hour._value),
            reservationStatus: new ReservationAvalible(reservationData.reservationStatus._value),
            peopleCount: new ReservationPeopleCount(reservationData.peopleCount._value),
            user: new ReservationUser(reservationData.user._value)
        })

        await this._reservationRepository.create(newReservation)

        return newReservation
    }
}
