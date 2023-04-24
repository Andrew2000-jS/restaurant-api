export class PasswordNotMatchException extends Error {
    constructor() {
        super('Passwords does not match')
    }
}
