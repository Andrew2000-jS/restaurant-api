import { PostgresOrderRepository } from '../../context/infrastructure'
import { OrderDeleter } from '../../context/application'

const postgresOrderRepository = new PostgresOrderRepository()

export default new OrderDeleter(postgresOrderRepository)
