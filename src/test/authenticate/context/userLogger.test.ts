import { expect, it, describe } from 'vitest'
import { DbMock } from '../mock'
import { UserCreator, UserLogger } from 'modules/authenticate/context/application'
import { AuthPrimitiveType } from 'modules/authenticate/context/domain'

describe('User Logger', () => {
    it('user should can login', async () => {
        const db = new DbMock()
        const userCreator = new UserCreator(db)
        const userLogger = new UserLogger(db)

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
        const log = await userLogger.run(11111111, newUser.password)
        expect(log?.name._value).toBe('Jhon')
    })
})
