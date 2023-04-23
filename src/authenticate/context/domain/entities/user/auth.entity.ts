import { EntityRoot } from '../entityRoot'
import { UserPassword, UserPhone, UserEmail, UserName, UserCi, UserLastName } from './valueObjects'

export interface AuthPrimitiveType {
    ci: number
    birthdate: Date
    name: string
    lastName: string
    email: string
    phone: string
    address: string
    password: string
}

export type AuthLoginType = Pick<AuthPrimitiveType, 'ci' | 'password'>

export class User extends EntityRoot<User, AuthPrimitiveType> {
   readonly ci: UserCi
   readonly birthdate: Date
   readonly name: UserName
   readonly lastName: UserName
   readonly email: UserEmail
   readonly phone: UserPhone
   readonly address: string
   readonly password: string

   constructor({ ci, birthdate, name, lastName, email, phone, address, password }: {
    name: UserName
    lastName: UserLastName
    birthdate: Date
    email: UserEmail
    phone: UserPhone
    password: string
    ci: UserCi
    address: string
}) {
    super()
    this.ci = ci
    this.birthdate = birthdate
    this.name = name
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.address = address
    this.password = password
   }

   static create(
    ci: UserCi,
    birthdate: Date,
    name: UserName,
    lastName: UserLastName,
    email: UserEmail,
    phone: UserPhone,
    address: string,
    password: string

    ): User {
        return new User({
            ci,
            name,
            lastName,
            email,
            phone,
            birthdate,
            address,
            password
        })
    }

   static fromPrimitives(plainData: {
    birthdate: Date
    ci: number
    name: string
    lastName: string
    email: string
    phone: string
    address: string
    password: string
   }): User {
    return new User({
        ci: new UserCi(plainData.ci),
        name: new UserName(plainData.name),
        lastName: new UserName(plainData.lastName),
        birthdate: plainData.birthdate,
        email: new UserEmail(plainData.email),
        phone: new UserPhone(plainData.phone),
        address: plainData.address,
        password: new UserPassword(plainData.password)._value
    })
   }

   toPrimitives(): AuthPrimitiveType {
       return {
        ci: this.ci._value,
        name: this.name._value,
        lastName: this.lastName._value,
        email: this.email._value,
        phone: this.phone._value,
        birthdate: this.birthdate,
        address: this.address,
        password: this.password
       }
   }

   isAdult(birthdate?: Date): void {
    console.log(birthdate)
   }
}
