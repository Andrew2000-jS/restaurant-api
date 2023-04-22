import { AuthEntity } from '../entities'
import { AuthRepository } from '../repository'

export class FindAllUsersService {
    private readonly _authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this._authRepository = authRepository
    }

    async findId(): Promise<AuthEntity[]> {
        const foundUsers = await this._authRepository.findAll()
        return foundUsers
    }
}
