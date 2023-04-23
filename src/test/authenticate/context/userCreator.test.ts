import { expect, it, describe } from 'vitest'
import { DbMock } from '../mock'
import { UserCreator } from '@/authenticate/context/application'
import { AuthPrimitiveType } from '@/authenticate/context/domain'

describe('User creator', () => {
    it('should can create an user', async () => {
        const dbMock = new DbMock()
        const userCreator = new UserCreator(dbMock)

        const newUser: AuthPrimitiveType = {
            ci: 11111111,
            name: 'Jhon',
            lastName: 'Doe',
            email: 'jhon@gmail.com',
            birthdate: new Date('2000-09-06'),
            address: 'Example address',
            password: 'Abc@1235',
            phone: '000000000'
        }

        await userCreator.run(newUser)

        const findUser = dbMock.db.find(x => x.ci._value === newUser.ci)
        expect(findUser?.name._value).toBe('Jhon')
    })

    describe('Fail cases', () => {
        it('should throw if user is already exist', async () => {
            const dbMock = new DbMock()
            const userCreator = new UserCreator(dbMock)

            const newUser: AuthPrimitiveType = {
                ci: 11111111,
                name: 'Jhon',
                lastName: 'Doe',
                email: 'jhon@gmail.com',
                birthdate: new Date('2000-09-06'),
                address: 'Example address',
                password: 'Abc@1235',
                phone: '000000000'
            }

            await userCreator.run(newUser)
            await expect(userCreator.run(newUser)).rejects.toThrowError(/User already exist!/)
        })

        it('should throw if user fields are incorrect', async() => {
            const dbMock = new DbMock()
            const userCreator = new UserCreator(dbMock)

            const newUser: AuthPrimitiveType = {
                ci: 11111111,
                name: 'Jhon@',
                lastName: 'Doe',
                email: 'jhon@gmail.com',
                birthdate: new Date('2000-09-06'),
                address: 'Example address',
                password: 'Abc@1235',
                phone: '000000000'
            }

            await expect(userCreator.run(newUser)).rejects.toThrowError(/The provided name are not valid/)

            newUser.name = 'Jhon'
            newUser.lastName = 'Doe1234'
            await expect(userCreator.run(newUser)).rejects.toThrowError(/The provided last name are not valid/)

            newUser.lastName = 'Doe'
            newUser.email = 'jhongmail.com'
            await expect(userCreator.run(newUser)).rejects.toThrowError(/The provided email is not valid/)

            newUser.email = 'jhon@gmail.com'
            newUser.password = 'Abc35'
            await expect(userCreator.run(newUser)).rejects.toThrowError(/The provided password is not valid/)

            newUser.password = 'Abc@1235'
            newUser.phone = '0000a000'
            await expect(userCreator.run(newUser)).rejects.toThrowError(/The provided phone is not valid/)

            newUser.phone = '000000000'
            newUser.birthdate = new Date('2007-01-31')
            await expect(userCreator.run(newUser)).rejects.toThrowError(/User is not of legal age/)
        })
    })
})
