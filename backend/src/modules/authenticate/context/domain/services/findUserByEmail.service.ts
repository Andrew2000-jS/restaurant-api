import { User } from '../entities'
import { AuthRepository } from '../repository'
import { UserAlreadyExistException, UserNotFoundException } from '../exceptions'

export class FindUserByEmailService {
    private readonly _authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this._authRepository = authRepository
    }

    async findEmail(email: string): Promise<User | undefined> {
        const foundUser = await this._authRepository.findByEmail(email)

        if (!foundUser) throw new UserNotFoundException()

        return foundUser
    }

    async isAlreadyExist(email: string): Promise<User | undefined> {
        const foundUser = await this._authRepository.findByEmail(email)

        if (foundUser) throw new UserAlreadyExistException()

        return foundUser
    }
}
