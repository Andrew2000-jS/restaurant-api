import { User } from '../entities'
import { AuthRepository } from '../repository'

export class FindAllUsersService {
    private readonly _authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this._authRepository = authRepository
    }

    async findId(): Promise<User[]> {
        const foundUsers = await this._authRepository.findAll()
        return foundUsers
    }
}
