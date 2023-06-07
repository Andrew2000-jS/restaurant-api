export class NotFoundException extends Error {
    constructor() {
        super('The requested order does not exist')
    }
}
