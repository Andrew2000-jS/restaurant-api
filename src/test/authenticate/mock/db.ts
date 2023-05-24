import { AuthRepository, User } from 'modules/authenticate/context/domain'

export class DbMock implements AuthRepository {
    db: User[] = []

    signup(user: User): Promise<User> {
        this.db.push(user)
        return Promise.resolve(user)
    }

    login(ci: number, password: string): Promise<User | undefined> {
        const foundUser = this.db.find(x => (x.ci && x.password) === (ci && password))
        return Promise.resolve(foundUser)
    }

    update(id: string, user: User): Promise<User | undefined> {
        const usersList = this.db.filter((_, i) => i.toString() !== id)
        usersList.push(user)
        this.db = usersList
        return Promise.resolve(user)
    }

    delete(id: string): Promise<void> {
        this.db = this.db.filter((_, i) => i.toString() !== id)
        return Promise.resolve()
    }

    findByCi(ci: number): Promise<User | undefined> {
        const foundUser = this.db.find(x => x.ci._value === ci)

        return Promise.resolve(foundUser!)
    }

    findById(id: string): Promise<User | undefined> {
        const foundUser = this.db.find((_, i) => i.toString() === id)

        return Promise.resolve(foundUser)
    }

    findByEmail(email: string): Promise<User | undefined> {
        const foundUser = this.db.find(x => x.email._value === email)

        return Promise.resolve(foundUser!)
    }

    findByPhone(phone: string): Promise<User | undefined> {
        const foundUser = this.db.find(x => x.phone._value === phone)

        return Promise.resolve(foundUser!)
    }

    findAll(): Promise<User[]> {
        return Promise.resolve(this.db)
    }
}
