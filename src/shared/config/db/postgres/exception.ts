export class PgException extends Error {
    constructor() {
        super('An error occurred while executing the query')
    }
}
