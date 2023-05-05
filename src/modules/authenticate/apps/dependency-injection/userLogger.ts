import { UserLogger } from '../../context/application'
import { PostgresAuthRepository } from '../../context/infrastructure'

const postgresAuthRepository = new PostgresAuthRepository()

export default new UserLogger(postgresAuthRepository)
