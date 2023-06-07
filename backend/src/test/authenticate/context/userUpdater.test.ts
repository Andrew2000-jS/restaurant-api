import { expect, it, describe } from 'vitest'
import { DbMock } from '../mock'
import { UserCreator, UserUpdater } from 'modules/authenticate/context/application'
import { AuthPrimitiveType } from 'modules/authenticate/context/domain'

describe('User Updater', () => {
    it('should can update an user', async () => {
        const db = new DbMock()
        const userCreator = new UserCreator(db)
        const userUpdater = new UserUpdater(db)

        const newUser: AuthPrimitiveType = {
            ci: 11111111,
            name: 'Jhon',
            lastname: 'Doe',
            email: 'jhon@gmail.com',
            birthdate: new Date('2000-09-06'),
            address: 'Example address',
            password: 'Abc@1235',
            phone: '000000000'
        }

        await userCreator.run(newUser)

        const id = '0'

        const foundUserBefore = await db.findById(id)
        expect(foundUserBefore?.name._value).toBe('Jhon')

        const updatedUser: AuthPrimitiveType = {
            ci: 21234567,
            name: 'Bill',
            lastname: 'Doe',
            email: 'bill@gmail.com',
            birthdate: new Date('1999-09-06'),
            address: 'Example address',
            password: 'Admin@1235',
            phone: '000000000'
        }

        await userUpdater.run(id, updatedUser)

        const foundUserAfter = await db.findById(id)
        expect(foundUserAfter?.name._value).toBe('Bill')
    })
})
