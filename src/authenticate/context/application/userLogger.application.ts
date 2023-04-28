import { AuthRepository, FindUserByCiService, User } from '../domain'
import { Crypter } from '../shared'

export class UserLogger {
    private readonly _authRepository: AuthRepository
    private readonly _findUserByCiService: FindUserByCiService
    private readonly _crypter: Crypter

    constructor(authRepository: AuthRepository) {
        this._authRepository = authRepository
        this._findUserByCiService = new FindUserByCiService(this._authRepository)
        this._crypter = new Crypter()
    }

    async run(ci: number, password: string): Promise<User | undefined> {
        const foundUser = await this._findUserByCiService.findCi(ci)
        await this._crypter.comparePasswords(password, foundUser.password)

        return foundUser
    }
}
