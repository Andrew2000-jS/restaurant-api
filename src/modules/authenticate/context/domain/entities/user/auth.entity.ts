import { EntityRoot } from '../entityRoot'
import { AgeException, EmptyFieldException } from './exceptions'
import { UserPassword, UserPhone, UserEmail, UserName, UserCi, UserLastName, UserAddress } from './valueObjects'

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

export class User extends EntityRoot<User, AuthPrimitiveType> {
   readonly ci: UserCi
   readonly birthdate: Date
   readonly name: UserName
   readonly lastName: UserName
   readonly email: UserEmail
   readonly phone: UserPhone
   readonly address: UserAddress
   readonly password: string

   constructor({ ci, birthdate, name, lastName, email, phone, address, password }: {
    name: UserName
    lastName: UserLastName
    birthdate: Date
    email: UserEmail
    phone: UserPhone
    ci: UserCi
    address: UserAddress
    password: string
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
    address: UserAddress,
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
        address: new UserAddress(plainData.address),
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
        address: this.address._value,
        password: this.password
       }
   }

   isAdult(birthdate: Date): void {
    if (!birthdate) {
        throw new EmptyFieldException()
    }

    const today = new Date()
    const year = birthdate.getFullYear()
    const month = birthdate.getMonth()
    const day = birthdate.getDate()
    let age = today.getFullYear() - year
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()

    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age--
    }

    if (age < 18) {
        throw new AgeException()
    }
   }
}
