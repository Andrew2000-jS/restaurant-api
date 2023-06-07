export class NoReservationsFound extends Error {
    constructor() {
        super('There is no reservations')
    }
}
