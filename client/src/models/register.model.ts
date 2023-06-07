export interface IRegister {
    name: string
    lastName: string
    email: string
    ci: number
    phone: string
    password: string
    birthdate: Date
    address: string
}

export interface ILogin {
    ci: number
    password: string
}