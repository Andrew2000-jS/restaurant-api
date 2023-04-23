import { AuthRepository, User, AuthLoginType, UserNotFoundException } from '@/authenticate/context/domain'

export class DbMock implements AuthRepository {
    db: User[] = []

    signup(user: User): Promise<User> {
        this.db.push(user)
        return Promise.resolve(user)
    }

    login(user: AuthLoginType): Promise<User> {
        const foundUser = this.db.find(x => (x.ci && x.password) === (user.ci && user.password))

        if (!foundUser) {
            throw new UserNotFoundException()
        }

        return Promise.resolve(foundUser)
    }

    update(_id?: string, ci?: number | undefined): Promise<User> {
        const foundUser = this.db.find(x => x.ci._value === ci)

        if (!foundUser) {
            throw new UserNotFoundException()
        }

        return Promise.resolve(foundUser)
    }

    delete(_id?: string | undefined, ci?: number | undefined): Promise<void> {
        const foundUser = this.db.find(x => x.ci._value === ci)

        if (!foundUser) {
            throw new UserNotFoundException()
        }

        return Promise.resolve()
    }

    findByCi(ci: number): Promise<User> {
        const foundUser = this.db.find(x => x.ci._value === ci)

        if (!foundUser) {
            throw new UserNotFoundException()
        }

        return Promise.resolve(foundUser)
    }

    findById(id: string): Promise<User> {
        const foundUser = this.db.find((_, i) => i.toString() === id)

        if (!foundUser) {
            throw new UserNotFoundException()
        }

        return Promise.resolve(foundUser)
    }

    findByEmail(email: string): Promise<User> {
        const foundUser = this.db.find(x => x.email._value === email)

        if (!foundUser) {
            throw new UserNotFoundException()
        }

        return Promise.resolve(foundUser)
    }

    findAll(): Promise<User[]> {
        return Promise.resolve(this.db)
    }
}
