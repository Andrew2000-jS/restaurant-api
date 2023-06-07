import { User } from '../entities'
import { AuthRepository } from '../repository'
import { UserAlreadyExistException, UserNotFoundException } from '../exceptions'

export class FindUserByPhoneService {
    private readonly _authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this._authRepository = authRepository
    }

    async findPhone(phone: string): Promise<User | undefined> {
        const foundUser = await this._authRepository.findByPhone(phone)

        if (!foundUser) throw new UserNotFoundException()

        return foundUser
    }

    async isAlreadyExist(phone: string): Promise<User | undefined> {
        const foundUser = await this._authRepository.findByPhone(phone)

        if (foundUser) throw new UserAlreadyExistException()

        return foundUser
    }
}
