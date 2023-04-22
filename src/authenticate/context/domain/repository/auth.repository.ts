import { AuthEntity, AuthLoginType, AuthReigisterType } from '../entities'

export interface AuthRepository {
    login: (User: AuthLoginType) => Promise<AuthEntity>
    signup: (User: AuthReigisterType) => Promise<AuthEntity>
    update: (id: string, ci?: number) => Promise<AuthEntity>
    delete: (id: string, ci?: number) => Promise<void>
    findByCi: (ci: number) => Promise<AuthEntity>
    findById: (id: string) => Promise<AuthEntity>
    findByEmail: (email: string) => Promise<AuthEntity>
    findAll: () => Promise<AuthEntity[]>
}
