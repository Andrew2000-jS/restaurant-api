import {
  HourFormatException,
  PeopleCountExepction,
  AvalibleReservationExepction,
  UserReservationException
} from './exepctions'

export class ReservationHour {
  readonly _value: string

  constructor(value: string) {
    const reg = /^(?:[01]\d|2[0-3]):[0-5]\d$/
    if (!reg.test(value)) {
      throw new HourFormatException()
    }

    this._value = value
  }
}

export class ReservationPeopleCount {
  readonly _value: number

  constructor(value: number) {
    if (value < 0) {
      throw new PeopleCountExepction()
    }

    this._value = value
  }
}

export class ReservationAvalible {
  readonly _value: boolean

  constructor(value: boolean) {
    if (typeof value !== 'boolean') {
      throw new AvalibleReservationExepction()
    }

    this._value = value
  }
}

export class ReservationUser {
  readonly _value: any

  constructor(value: any) {
    if (
        Array.isArray(value) ||
        typeof value !== 'object' ||
        value === null ||
        value === undefined ||
        Object.keys(value).length === 0 ||
        (typeof value === 'string' || typeof value === 'number')
    ) {
      throw new UserReservationException()
    }

    this._value = value
  }
}
