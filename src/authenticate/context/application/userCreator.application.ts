import { AuthPrimitiveType, User, UserCi, UserEmail, UserLastName, UserName, UserPassword, UserPhone, AuthRepository } from '../domain'
import { Crypter } from '../shared'

export class UserCreator {
    private readonly _authRepository: AuthRepository

    constructor (authRepository: AuthRepository) {
        this._authRepository = authRepository
    }

    async run(user: AuthPrimitiveType): Promise<User> {
        const crypter = new Crypter()

        const newUser = new User({
            ci: new UserCi(user.ci),
            name: new UserName(user.name),
            lastName: new UserLastName(user.lastName),
            email: new UserEmail(user.email),
            phone: new UserPhone(user.phone),
            address: user.address,
            birthdate: user.birthdate,
            password: await crypter.encrypt(new UserPassword(user.password)._value)
        })

        const creator = await this._authRepository.signup(newUser)
        return creator
    }
}
