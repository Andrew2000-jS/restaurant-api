export class HourFormatException extends Error {
    constructor() {
        super('The provided hour is not valid')
    }
}

export class PeopleCountExepction extends Error {
    constructor() {
        super('The provided people count is not valid')
    }
}

export class AvalibleReservationExepction extends Error {
    constructor() {
        super('The provided avalible reservations are not valid')
    }
}

export class UserReservationException extends Error {
    constructor() {
        super('The provided user is not valid')
    }
}
