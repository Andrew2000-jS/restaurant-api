import { AuthRepository, User, UserNotFoundException } from '../domain'

export class FindByCi {
    private readonly _authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this._authRepository = authRepository
    }

    async run(ci: number): Promise<User> {
        const foundUser = await this._authRepository.findByCi(ci)
        if (!foundUser) throw new UserNotFoundException()

        return foundUser
    }
}
