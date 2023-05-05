import { User } from '../entities'

export interface AuthRepository {
    login: (ci: number, password: string) => Promise<User | undefined>
    signup: (user: User) => Promise<User>
    update: (id: string, data: User) => Promise<User | undefined>
    delete: (id: string) => Promise<void>
    findByCi: (ci: number) => Promise<User | undefined>
    findById: (id: string) => Promise<User | undefined>
    findByEmail: (email: string) => Promise<User | undefined>
    findAll: () => Promise<User[]>
}
