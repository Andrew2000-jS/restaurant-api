export class TotalOrdersException extends Error {
    constructor() {
        super('Total orders field is not valid')
    }
}

export class UserIdOrdersException extends Error {
    constructor() {
        super('User id is not valid')
    }
}

export class ExpiredOrdersException extends Error {
    constructor() {
        super('Expired field is not valid')
    }
}
