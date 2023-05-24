import {
  Reservation,
  ReservationAvalible,
  ReservationHour,
  ReservationPeopleCount,
  ReservationUser,
  ReservationRepository,
  ReservationPrimitiveData
} from '../domain'

export class ReservationCreator {
    private readonly _reservationRepository: ReservationRepository

    constructor (reservationRepository: ReservationRepository) {
        this._reservationRepository = reservationRepository
    }

    async run(reservationData: ReservationPrimitiveData): Promise<Reservation> {
        const newReservation: Reservation = new Reservation({
            date: reservationData.date,
            hour: new ReservationHour(reservationData.hour),
            status: new ReservationAvalible(reservationData.status),
            count: new ReservationPeopleCount(reservationData.count),
            user: new ReservationUser(reservationData.user)
        })

        await this._reservationRepository.create(newReservation)

        return newReservation
    }
}
