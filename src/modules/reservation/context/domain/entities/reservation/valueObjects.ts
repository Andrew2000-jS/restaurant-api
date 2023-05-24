import {
  HourFormatException,
  PeopleCountExepction,
  AvalibleReservationException,
  UserReservationException,
  DateReservationException
} from './exepctions'

export class ReservationHour {
  readonly _value: string

  constructor(value: string) {
    const reg = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
    if (!reg.test(value)) {
      throw new HourFormatException()
    }

    this._value = value
  }
}

export class ReservationPeopleCount {
  readonly _value: number

  constructor(value: number) {
    const charRegex = /[a-zA-Z]/
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>\s]/
    const valueStr = value.toString()

    if (charRegex.test(valueStr) || specialCharRegex.test(valueStr) || valueStr === '' || value < 0) throw new PeopleCountExepction()

    this._value = value
  }
}

export class ReservationAvalible {
  readonly _value: boolean

  constructor(value: boolean) {
    if (typeof value !== 'boolean') {
      throw new AvalibleReservationException()
    }

    this._value = value
  }
}

export class ReservationUser {
  readonly _value: number

  constructor(value: number) {
    if (!value) {
      throw new UserReservationException()
    }

    this._value = value
  }
}

export class ReservationDate {
  readonly _value: Date

  constructor(value: Date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/

    if (!dateRegex.test(value.toISOString().split('T')[0])) {
      throw new DateReservationException()
    }

    this._value = value
  }
}
