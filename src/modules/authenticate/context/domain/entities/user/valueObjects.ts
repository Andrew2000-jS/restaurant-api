import {
  NameException,
  EmailException,
  PhoneException,
  PasswordException,
  CiException,
  LastNameException,
  EmptyFieldException,
  InvalidLengthException
} from './exceptions'

export class UserName {
  readonly _value: string

  constructor(value: string) {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
    const numCharRegex = /\d/

    if (
      specialCharRegex.test(value) ||
      numCharRegex.test(value) ||
      value === ''
    ) { throw new NameException() }

    this._value = value
  }
}

export class UserLastName {
   readonly _value: string

  constructor(value: string) {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
    const numCharRegex = /\d/

    if (
      specialCharRegex.test(value) ||
      numCharRegex.test(value) ||
      value === ''
    ) { throw new LastNameException() }

    this._value = value
  }
}

export class UserEmail {
  readonly _value: string

  constructor(value: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!regex.test(value)) throw new EmailException()

    this._value = value
  }
}

export class UserPhone {
  readonly _value: string

  constructor(value: string) {
    const charRegex = /[a-zA-Z]/
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>\s]/

    if (charRegex.test(value) || specialCharRegex.test(value) || value === '') throw new PhoneException()

    this._value = value
  }
}

export class UserPassword {
  readonly _value: string

  constructor(value: string) {
    const regex = /[A-Z]/

    if (value.length < 8 || !regex.test(value) || value === '') throw new PasswordException()

    this._value = value
  }
}

export class UserCi {
  readonly _value: number

  constructor(value: number) {
    const ciLength = value.toString().length

    if (ciLength < 6 || ciLength > 8) throw new CiException()

    this._value = value
  }
}

export class UserAddress {
  readonly _value: string

  constructor(value: string) {
    if (value === '') throw new EmptyFieldException()

    if (value.length < 10) throw new InvalidLengthException()

    this._value = value
  }
}
