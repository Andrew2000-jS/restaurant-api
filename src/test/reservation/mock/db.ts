import {
  ReservationRepository,
  Reservation,
  ReservationHour,
  ReservationPeopleCount,
  ReservationAvalible,
  ReservationUser
} from 'modules/reservation/context/domain'

export class DbMock implements ReservationRepository {
  db: Reservation[] = []

  async create(reservation: Reservation): Promise<Reservation> {
    const newReservation = new Reservation({
      date: reservation.date,
      hour: new ReservationHour(reservation.hour._value),
      peopleCount: new ReservationPeopleCount(reservation.peopleCount._value),
      reservationStatus: new ReservationAvalible(reservation.reservationStatus._value),
      user: new ReservationUser(reservation.user._value)
    })

    this.db.push(newReservation)
    return await Promise.resolve(newReservation)
  }

  async update(id: string, reservation: Reservation): Promise<Reservation> {
    const reservationList = this.db.filter((_, i) => i.toString() !== id)
    reservationList.push(reservation)
    this.db = reservationList

    return await Promise.resolve(reservation)
  }

  async delete(id: string): Promise<void> {
    this.db.filter((_, i) => i.toString() === id)
  }

  async getAll(): Promise<Reservation[]> {
    return this.db
  }

  async getById(id: string): Promise<Reservation | null> {
    const foundReservation = this.db.find((_, i) => i.toString() === id) as Reservation

    return foundReservation
  }

  async getByUser(userId: string): Promise<Reservation[]> {
    console.log(userId)
    return await Promise.resolve(this.db)
  }
}
