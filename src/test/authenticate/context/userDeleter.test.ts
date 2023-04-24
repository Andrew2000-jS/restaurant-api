import { expect, it, describe } from 'vitest'
import { DbMock } from '../mock'
import { UserCreator, UserDeleter } from '@/authenticate/context/application'
import { AuthPrimitiveType } from '@/authenticate/context/domain'

describe('Use Deleter', () => {
    it('should can delete an user', async () => {
        const db = new DbMock()
        const userCreator = new UserCreator(db)
        const userDeleter = new UserDeleter(db)
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

        expect(db.db.length).toBe(1)

        const id = '0'

        await userDeleter.run(id)
        expect(db.db.length).toBe(0)
    })
})
