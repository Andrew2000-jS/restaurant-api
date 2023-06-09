import { FindByCi } from '../../context/application'
import { PostgresAuthRepository } from '../../context/infrastructure/postgres'

const authRepository = new PostgresAuthRepository()

export default new FindByCi(authRepository)
