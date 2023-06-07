import { EntityRoot } from '../entityRoot'
import { ReservationAvalible, ReservationHour, ReservationPeopleCount, ReservationUser } from './valueObjects'

export interface ReservationPrimitiveData {
  date: Date
  hour: string
  count: number
  status: boolean
  user: any
}

export class Reservation extends EntityRoot<
  Reservation,
  ReservationPrimitiveData
> {
  readonly date: Date
  readonly hour: ReservationHour
  readonly count: ReservationPeopleCount
  readonly status: ReservationAvalible
  readonly user: ReservationUser

  constructor({
    date,
    hour,
    count,
    user,
    status
  }: {
    date: Date
    hour: ReservationHour
    count: ReservationPeopleCount
    user: ReservationUser
    status: ReservationAvalible
  }) {
    super()
    this.date = date
    this.hour = hour
    this.count = count
    this.user = user
    this.status = status
  }

  static create(
    date: Date,
    hour: ReservationHour,
    count: ReservationPeopleCount,
    user: ReservationUser,
    status: ReservationAvalible
  ): Reservation {
    return new Reservation({
      date,
      hour,
      count,
      status,
      user
    })
  }

  fromPrimitives(plainData: {
    date: Date
    hour: string
    count: number
    user: any
    status: boolean
  }): Reservation {
    return new Reservation({
      date: plainData.date,
      hour: new ReservationHour(plainData.hour),
      count: new ReservationPeopleCount(plainData.count),
      status: new ReservationAvalible(plainData.status),
      user: new ReservationUser(plainData.user)
    })
  }

  toPrimitive(): ReservationPrimitiveData {
    return {
      date: this.date,
      hour: this.hour._value,
      count: this.count._value,
      status: this.status._value,
      user: this.user
    }
  }
}
