import { AuthLoginType, User } from '../entities'

export interface AuthRepository {
    login: (User: AuthLoginType) => Promise<User | undefined>
    signup: (User: User) => Promise<User>
    update: (id?: string, ci?: number) => Promise<User>
    delete: (id?: string, ci?: number) => Promise<void>
    findByCi: (ci: number) => Promise<User>
    findById: (id: string) => Promise<User>
    findByEmail: (email: string) => Promise<User>
    findAll: () => Promise<User[]>
}
