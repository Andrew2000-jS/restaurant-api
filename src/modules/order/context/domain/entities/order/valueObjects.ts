import { ExpiredOrdersException, TotalOrdersException, UserIdOrdersException } from './exceptions'

export class TotalOrders {
    _value: number

    constructor(value: number) {
        if (!value || value <= 0) throw new TotalOrdersException()

        const val = value.toString()
        const charRegex = /[a-zA-Z]/
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>\s]/

        if (charRegex.test(val) || specialCharRegex.test(val)) throw new TotalOrdersException()

        this._value = value
    }
}

export class UserIdOrders {
    _value: number

    constructor(value: number) {
        if (!value) throw new UserIdOrdersException()

        this._value = value
    }
}

export class ExpiredOrders {
    _value: boolean

    constructor(value: boolean) {
        if (value === undefined || value === null) throw new ExpiredOrdersException()

        this._value = value
    }
}
