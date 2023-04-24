import { User } from '../entities'
import { AuthRepository } from '../repository'
import { UserNotFoundException } from '../exceptions'

export class FindUserByIdService {
    private readonly _authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this._authRepository = authRepository
    }

    async findId(id: string): Promise<User | undefined> {
        const foundUser = await this._authRepository.findById(id)

        if (!foundUser) throw new UserNotFoundException()

        return foundUser
    }
}
