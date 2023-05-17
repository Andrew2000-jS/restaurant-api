import { EntityRoot } from '../entityRoot'
import { ReservationAvalible, ReservationHour, ReservationPeopleCount, ReservationUser } from './valueObjects'

export interface ReservationPrimitiveData {
  date: Date
  hour: string
  peopleCount: number
  reservationStatus: boolean
  user: any
}

export class Reservation extends EntityRoot<
  Reservation,
  ReservationPrimitiveData
> {
  readonly date: Date
  readonly hour: ReservationHour
  readonly peopleCount: ReservationPeopleCount
  readonly reservationStatus: ReservationAvalible
  readonly user: ReservationUser

  constructor({
    date,
    hour,
    peopleCount,
    user,
    reservationStatus
  }: {
    date: Date
    hour: ReservationHour
    peopleCount: ReservationPeopleCount
    user: ReservationUser
    reservationStatus: ReservationAvalible
  }) {
    super()
    this.date = date
    this.hour = hour
    this.peopleCount = peopleCount
    this.user = user
    this.reservationStatus = reservationStatus
  }

  static create(
    date: Date,
    hour: ReservationHour,
    peopleCount: ReservationPeopleCount,
    user: ReservationUser,
    reservationStatus: ReservationAvalible
  ): Reservation {
    return new Reservation({
      date,
      hour,
      peopleCount,
      reservationStatus,
      user
    })
  }

  fromPrimitives(plainData: {
    date: Date
    hour: string
    peopleCount: number
    user: any
    reservationStatus: boolean
  }): Reservation {
    return new Reservation({
      date: plainData.date,
      hour: new ReservationHour(plainData.hour),
      peopleCount: new ReservationPeopleCount(plainData.peopleCount),
      reservationStatus: new ReservationAvalible(plainData.reservationStatus),
      user: new ReservationUser(plainData.user)
    })
  }

  toPrimitive(): ReservationPrimitiveData {
    return {
      date: this.date,
      hour: this.hour._value,
      peopleCount: this.peopleCount._value,
      reservationStatus: this.reservationStatus._value,
      user: this.user
    }
  }
}
