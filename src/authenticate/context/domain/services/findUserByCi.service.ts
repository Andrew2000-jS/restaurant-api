import { User } from '../entities'
import { AuthRepository } from '../repository'
import { UserAlreadyExistException, UserNotFoundException } from '../exceptions'

export class FindUserByCiService {
    private readonly _authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this._authRepository = authRepository
    }

    async findCi(ci: number): Promise<User> {
        const foundUser = await this._authRepository.findByCi(ci)

        if (!foundUser) throw new UserNotFoundException()

        return foundUser
    }

    async isAlreadyExist(ci: number): Promise<User> {
        const foundUser = await this._authRepository.findByCi(ci)

        if (foundUser) throw new UserAlreadyExistException()

        return foundUser
    }
}
