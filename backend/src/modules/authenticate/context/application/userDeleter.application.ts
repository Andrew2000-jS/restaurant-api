import { AuthRepository, FindUserByIdService } from '../domain'

export class UserDeleter {
  private readonly _authRepository: AuthRepository
  private readonly _findUserByIdService: FindUserByIdService

  constructor(authRepository: AuthRepository) {
    this._authRepository = authRepository
    this._findUserByIdService = new FindUserByIdService(this._authRepository)
  }

  async run(id: string): Promise<void> {
    await this._findUserByIdService.findId(id)
    await this._authRepository.delete(id)
  }
}
