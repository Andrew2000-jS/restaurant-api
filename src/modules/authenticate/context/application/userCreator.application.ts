import {
  AuthPrimitiveType,
  User,
  UserCi,
  UserEmail,
  UserLastName,
  UserName,
  UserPhone,
  AuthRepository,
  FindUserByCiService,
  FindUserByEmailService,
  UserAddress
} from '../domain'

import { Crypter } from '../shared'

export class UserCreator {
  private readonly _authRepository: AuthRepository
  private readonly _findUserByCiService: FindUserByCiService
  private readonly _findUserByEmailService: FindUserByEmailService
  private readonly _crypter: Crypter

  constructor(authRepository: AuthRepository) {
    this._authRepository = authRepository
    this._findUserByCiService = new FindUserByCiService(this._authRepository)
    this._findUserByEmailService = new FindUserByEmailService(
      this._authRepository
    )
    this._crypter = new Crypter()
  }

  async run(user: AuthPrimitiveType): Promise<User> {
    const newUser = new User({
      ci: new UserCi(user.ci),
      name: new UserName(user.name),
      lastName: new UserLastName(user.lastName),
      email: new UserEmail(user.email),
      phone: new UserPhone(user.phone),
      address: new UserAddress(user.address),
      password: await this._crypter.encrypt(user.password),
      birthdate: user.birthdate
    })

    await this._findUserByCiService.isAlreadyExist(newUser.ci._value)
    await this._findUserByEmailService.isAlreadyExist(newUser.email._value)

    newUser.isAdult(newUser.birthdate)

    const creator = await this._authRepository.signup(newUser)
    return creator
  }
}
