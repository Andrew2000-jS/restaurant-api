import { EntityRoot } from '../entityRoot'
import { ReservationAvalible, ReservationHour, ReservationPeopleCount, ReservationUser } from './valueObjects'

export interface ReservationPrimitiveData {
  date: Date
  hour: string
  peopleCount: number
  avalibleReservations: boolean
  user: any
}

export class Reservation extends EntityRoot<
  Reservation,
  ReservationPrimitiveData
> {
  readonly date: Date
  readonly hour: ReservationHour
  readonly peopleCount: ReservationPeopleCount
  readonly avalibleReservations: ReservationAvalible
  readonly user: ReservationUser

  constructor({
    date,
    hour,
    peopleCount,
    user,
    avalibleReservations
  }: {
    date: Date
    hour: ReservationHour
    peopleCount: ReservationPeopleCount
    user: ReservationUser
    avalibleReservations: ReservationAvalible
  }) {
    super()
    this.date = date
    this.hour = hour
    this.peopleCount = peopleCount
    this.user = user
    this.avalibleReservations = avalibleReservations
  }

  static create(
    date: Date,
    hour: ReservationHour,
    peopleCount: ReservationPeopleCount,
    user: ReservationUser,
    avalibleReservations: ReservationAvalible
  ): Reservation {
    return new Reservation({
      date,
      hour,
      peopleCount,
      avalibleReservations,
      user
    })
  }

  fromPrimitives(plainData: {
    date: Date
    hour: string
    peopleCount: number
    user: any
    avalibleReservations: boolean
  }): Reservation {
    return new Reservation({
      date: plainData.date,
      hour: new ReservationHour(plainData.hour),
      peopleCount: new ReservationPeopleCount(plainData.peopleCount),
      avalibleReservations: new ReservationAvalible(plainData.avalibleReservations),
      user: new ReservationUser(plainData.user)
    })
  }

  toPrimitive(): ReservationPrimitiveData {
    return {
      date: this.date,
      hour: this.hour._value,
      peopleCount: this.peopleCount._value,
      avalibleReservations: this.avalibleReservations._value,
      user: this.user
    }
  }
}
