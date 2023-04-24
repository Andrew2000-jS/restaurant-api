import {
  AuthPrimitiveType,
  User,
  UserCi,
  UserEmail,
  UserLastName,
  UserName,
  UserPassword,
  UserPhone,
  AuthRepository,
  FindUserByIdService,
  UserAddress
} from '../domain'

import { Crypter } from '../shared'

export class UserUpdater {
  private readonly _authRepository: AuthRepository
  private readonly _findByIdService: FindUserByIdService
  private readonly _crypter: Crypter

  constructor(authRepository: AuthRepository) {
    this._authRepository = authRepository
    this._findByIdService = new FindUserByIdService(this._authRepository)
    this._crypter = new Crypter()
  }

  async run(id: string, data: AuthPrimitiveType): Promise<User | undefined> {
    const foundUser = await this._findByIdService.findId(id)

    const userToUpdate = new User({
      ci: new UserCi(data.ci) ?? foundUser?.ci,
      name: new UserName(data.name) ?? foundUser?.name,
      lastName: new UserLastName(data.lastName) ?? foundUser?.lastName,
      birthdate: data.birthdate ?? foundUser?.birthdate,
      email: new UserEmail(data.email) ?? foundUser?.email,
      password:
        (await this._crypter.encrypt(new UserPassword(data.password)._value)) ??
        foundUser?.password,
      phone: new UserPhone(data.phone) ?? foundUser?.phone,
      address: new UserAddress(data.address) ?? foundUser?.address
    })

    await this._authRepository.update(id, userToUpdate)
    return userToUpdate
  }
}
