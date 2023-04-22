export interface AuthEntity {
    id: string
    ci: number
    birthdate: Date
    name: string
    lastName: string
    email: string
    phone: string
    address: string
    password: string
}

export type AuthLoginType = Pick<AuthEntity, 'ci' | 'password'>

export type AuthReigisterType = Omit<AuthEntity, 'id'>
