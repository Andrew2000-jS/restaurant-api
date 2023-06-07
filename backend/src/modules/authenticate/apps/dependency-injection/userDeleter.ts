import { UserDeleter } from '../../context/application'
import { PostgresAuthRepository } from '../../context/infrastructure/postgres'

const authRepository = new PostgresAuthRepository()

export default new UserDeleter(authRepository)
