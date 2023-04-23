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
            birthdate: new Date('2000-06-09'),
            address: 'Example address',
            password: 'Abc@1235',
            phone: '000000000'
        }

        await userCreator.run(newUser)

        const findUser = dbMock.db.find(x => x.ci._value === newUser.ci)
        expect(findUser?.name._value).toBe('Jhon')
    })
})
